import { Api } from '@/utils/api';
import { z } from 'zod';

import * as trpc from '../trpc';

export const appRouter = trpc.router(
  {
    get_tasks: trpc.procedure.
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
      .mutation(({input}) => {
        Api.post('tasks', 
          input
        )
      })
    });
// export type definition of API
export type AppRouter = typeof appRouter;