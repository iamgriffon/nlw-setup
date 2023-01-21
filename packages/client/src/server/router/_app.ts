import { z } from 'zod';

import * as trpc from '../trpc';

export const appRouter = trpc.router(
  {
    hello: trpc.procedure
      .input(
        z.object({
          text: z.string().nullable(),
        }),
      )
      .query(({ input }) => {
        return {
          greeting: `Hello ${input?.text ?? "from tRPC"}`,
        };
      }),
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
      const data = await fetch('http://localhost:4000/summary').then(res => res.json()).then(data => data)
      console.log(data)
     return data;
     })
    });
// export type definition of API
export type AppRouter = typeof appRouter;