import logoImage from '@/assets/logo.svg'
import Image from 'next/image';
import { Plus } from 'phosphor-react';
import { trpc } from '../utils/trpc';

export function Header() {

  const { data } = trpc.hello.useQuery({
    text: null
  }); 

  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>

      <Image src={logoImage} alt="Tasker" />

      <button
        type='button'
        className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300'
      >
        <Plus size={20} />
        {data?.greeting}
      </button>
    </div>
  )
}