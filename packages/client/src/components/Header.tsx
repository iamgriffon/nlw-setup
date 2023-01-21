import logoImage from '@/assets/logo.svg'
import Image from 'next/image';
import { Plus, X } from 'phosphor-react';
import { trpc } from '../utils/trpc';
import * as Dialog from '@radix-ui/react-dialog'
import { NewTaskForm } from './NewTaskForm';


export function Header() {

  const { data } = trpc.hello.useQuery({
    text: null
  });

  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <Image src={logoImage} alt="Tasker" />
      <Dialog.Root>
        <Dialog.Trigger
            type='button'
            className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300'
          >
            <Plus size={20} />
            {data?.greeting}
     
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />
          <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Dialog.Title className='text-3xl leading-right font-extrabold'>
                Create Task
              </Dialog.Title>
            
              <Dialog.Close className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-500'>
                <X size={24} aria-label='Fechar'/>
              </Dialog.Close>

              <NewTaskForm />
          </Dialog.Content>
  
        </Dialog.Portal>
      </Dialog.Root>



    </div>
  )
}