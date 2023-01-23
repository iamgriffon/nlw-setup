import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post('/tasks', async (request) => {
    const createTaskBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    });
    const { title, weekDays } = createTaskBody.parse(request.body);

    const today = dayjs().startOf('day').toDate();

    await prisma.task.create({
      data: {
        title: title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
        }
      }
    })
  });

  app.get('/tasks', async () => {
    const data = prisma.task.findMany();
    return data;
  });

  app.get('/day', async (request) => {

    const getDayParams = z.object({
      date: z.coerce.date(),
    })

    const { date } = getDayParams.parse(request.query)
    const parsedDate = dayjs(date).startOf('day').toDate();
    const CURRENT_WEEK_DAY = dayjs(parsedDate).get('day');

    const possibleTasks = await prisma.task.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: CURRENT_WEEK_DAY
          }
        }
      },
    })
    const completedTasks = await prisma.day.findUnique({
      where: {
        date: parsedDate
      },
      include: {
        taskDays: true
      }
    })

    return {
      possibleTasks,
      completedTasks
    }
  });

  app.get('/test', async () => {
    // const data = await prisma.taskWeekDays.findMany();

    const data = await prisma.day.findMany()
    return data;
  });

  app.patch('/tasks/:id/toggle', async (request) => {
    const toggleTaskParams = z.object({
      id: z.string().uuid()
    });

    const { id } = toggleTaskParams.parse(request.params);

    const today = dayjs().startOf('day').toDate();

    //Get today's date (normalized)
    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    });

    //"Create a day" if there isn't one.
    if (!day) {
     const newDay = await prisma.day.create({
        data: {
          date: today
        }
      });
      return newDay;
    };

    // Check if user has already finished tasks in for that day
    const taskDay = await prisma.taskDay.findUnique({
      where: {
        day_id_task_id: {
          day_id: day.id,
          task_id: id
        }
      }
    })

    console.log(taskDay)

    if (taskDay) {
      //if there's a taskDay, remove one
      await prisma.taskDay.delete({
        where: {
          id: taskDay.id
        }
      })
      //if there's isn't one, then create a new registry (for a task-day)
    } else {
      await prisma.taskDay.create({
        data: {
          day_id: day.id,
          task_id: id
        }
      })
    }
  });

  app.get('/summary', async () => {
    const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.date, 
        (
          SELECT 
          cast(COUNT(*) as float)
          FROM task_days TD
          WHERE TD.day_id = D.id
        ) as completedTasks,
        (
          SELECT
            cast(COUNT(*) as float)
            FROM task_week_days TWD
            JOIN tasks T 
            on T.id = TWD.task_id
            WHERE 
              TWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND T.created_at <= D.date
        ) as amount
      FROM days D
    `
    return summary;
  });

}

