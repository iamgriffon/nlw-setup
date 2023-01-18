import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'

const Home: NextPage = () => {

  const {data, isLoading, isFetched ,isSuccess} = trpc.hello.useQuery({
    text: null
  });

  console.log('I am loading', isLoading);
  console.log('I am Fetched', isFetched);
  console.log('I have Succeded', isSuccess);

  return (
    <>
    {data?.greeting && <>{data.greeting}</>}
    </>
  )
}

export default Home
