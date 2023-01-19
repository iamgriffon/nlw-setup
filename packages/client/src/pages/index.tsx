import { SummaryTable } from '@/components/SummaryTable'
import type { NextPage } from 'next'
import { Header } from '@/components/Header'

const Home: NextPage = () => {

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}

export default Home
