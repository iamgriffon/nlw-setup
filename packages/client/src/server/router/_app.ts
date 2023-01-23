import { Api } from '@/utils/api';
import { z } from 'zod';

import * as trpc from '../trpc';

export const appRouter = trpc.router(
  {
    get_summary: trpc.procedure.
      output(
        z.array(
          z.object({
            id: z.string(),
            date: z.string(),
            completedTasks: z.number(),
            amount: z.number()
          })
        )
      )
      .query(async () => {
        const data = await Api.get('summary').then(res => res.data)
        console.log(data)
        return data;
      }),

    add_task: trpc.procedure.
      input(
        z.object({
          title: z.string(),
          weekDays: z.array(z.number())
        })
      )
      .mutation(({ input }) => {
        Api.post('tasks',
          input
        )
      }),

    get_tasks_by_day: trpc.procedure
      .input(
        z.object({
          date: z.string()
        }))
      .output(
        z.object({
          completedTasks: z.array(z.string().optional()),
          possibleTasks: z.array(
            z.object({
              id: z.string().uuid(),
              title: z.string(),
              created_at: z.string()
            }).optional()
          )
        })
      )
      .query(async ({ input }) => {
        const data = await Api.get('day', {
          params: {
            date: input.date
          }
        }).then(res => res.data);
        return {
          completedTasks: data.completedTasks,
          possibleTasks: data.possibleTasks
        }
      }),

    get_tasks: trpc.procedure
      .output(
        z.array(
          z.object({
            id: z.string().uuid(),
            title: z.string(),
            created_at: z.string()
          })
        )
      )
      .query(async () => {

        type tasks = {
          id: string,
          title: string,
          created_at: string
        }[]

        const res: tasks = await Api.get('tasks').then(res => res.data);

        return res
      }),

    toggle_task: trpc.procedure
      .input(
        z.string()
      )
      .mutation(({ input }) => {
        Api.patch(`tasks/${input}/toggle`, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
      })
  });
// export type definition of API
export type AppRouter = typeof appRouter;