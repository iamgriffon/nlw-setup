import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const firsttaskId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firsttaskCreationDate = new Date('2022-12-31T03:00:00.000')

const secondtaskId = '00880d75-a933-4fef-94ab-e05744435297'
const secondtaskCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdtaskId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdtaskCreationDate = new Date('2023-01-08T03:00:00.000')

async function run() {
  await prisma.task.deleteMany()
  await prisma.day.deleteMany()

  /**
   * Create tasks
   */
  await Promise.all([
    prisma.task.create({
      data: {
        id: firsttaskId,
        title: 'Beber 2L água',
        created_at: firsttaskCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
          ]
        }
      }
    }),

    prisma.task.create({
      data: {
        id: secondtaskId,
        title: 'Exercitar',
        created_at: secondtaskCreationDate,
        weekDays: {
          create: [
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ]
        }
      }
    }),

    prisma.task.create({
      data: {
        id: thirdtaskId,
        title: 'Dormir 8h',
        created_at: thirdtaskCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ]
        }
      }
    })
  ])

  await Promise.all([
    /**
     * tasks (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Monday */
        date: new Date('2023-01-02T03:00:00.000z'),
        taskDay: {
          create: {
            task_id: firsttaskId,
          }
        }
      }
    }),

    /**
     * tasks (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Friday */
        date: new Date('2023-01-06T03:00:00.000z'),
        taskDay: {
          create: {
            task_id: firsttaskId,
          }
        }
      }
    }),

    /**
     * tasks (Complete/Available): 2/2
     */
    prisma.day.create({
      data: {
        /** Wednesday */
        date: new Date('2023-01-04T03:00:00.000z'),
        taskDay: {
          create: [
            { task_id: firsttaskId },
            { task_id: secondtaskId },
          ]
        }
      }
    }),
  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })