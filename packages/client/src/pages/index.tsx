import { SummaryTable } from '@/components/SummaryTable'
import { Header } from '@/components/Header'
import { trpc } from '@/utils/trpc'
import { inferRouterOutputs } from '@trpc/server'
import { AppRouter } from '@/server/router/_app'
import { TaskContextProvider } from '@/context/tasks'

export type Summary = inferRouterOutputs<AppRouter>['get_summary']

export default function Home() {

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header />
        <TaskContextProvider>
          <SummaryTable />
        </TaskContextProvider>
      </div>
    </div>
  )
}

