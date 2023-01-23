import { SummaryTable } from '@/components/SummaryTable'
import { Header } from '@/components/Header'
import { trpc } from '@/utils/trpc'
import { inferRouterOutputs } from '@trpc/server'
import { AppRouter } from '@/server/router/_app'
import { useEffect, useState } from 'react'
import { TaskContextProvider } from '@/context/tasks'

export type Summary = inferRouterOutputs<AppRouter>['get_summary']

export default function Home() {

  const [summary, setSummary] = useState<Summary>([])
  const { data } = trpc.get_summary.useQuery();

  useEffect(() => {
    data ? setSummary(data) : setSummary([]);
  }, [data])

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header />
        <TaskContextProvider>
          <SummaryTable summary={summary} />
        </TaskContextProvider>
      </div>
    </div>
  )
}

