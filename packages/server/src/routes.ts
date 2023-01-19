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

  app.get('/tasks', async() => {
    const data = prisma.task.findMany();
    return data;
  });

  app.get('/day', async(request) => {

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
    const completedHabits = await prisma.day.findUnique({
      where: {
          date: parsedDate
      },
      include: {
        taskDays: true
      }
    })

    return {
      possibleTasks,
      completedHabits
    }
  });

  app.get('/test', async () => {
    const data = await prisma.day.findMany();
    return data;
  })
}

