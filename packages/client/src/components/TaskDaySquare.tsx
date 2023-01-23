import * as PopOver from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs'
import { TaskList } from './TaskList';
import { ProgressBar } from './ProgressBar';
import { useState } from 'react';


interface TaskDaySquareProps {
  date: Date
  amount?: number
  defaultCompleted?: number
}

export function TaskDaySquare({ amount = 0, defaultCompleted = 0, date }: TaskDaySquareProps) {

  const [completed, setCompleted] = useState(defaultCompleted)
  const percentageProgress = amount > 0 ? Math.round((completed / amount) * 100) : 0;
  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  function handleCompleteTaskChange(completed: number){
    setCompleted(completed)
  }

  return (
    <PopOver.Root>
      <PopOver.Trigger className={clsx("w-10 h-10 border-2 rounded-lg transition-colors", {
        'bg-zinc-900 border-zinc-800': percentageProgress === 0,
        'bg-violet-900 border-violet-700': percentageProgress > 0 && percentageProgress < 20,
        'bg-violet-800 border-violet-600': percentageProgress >= 20 && percentageProgress < 40,
        'bg-violet-700 border-violet-500': percentageProgress >= 40 && percentageProgress < 60,
        'bg-violet-600 border-violet-400': percentageProgress >= 60 && percentageProgress < 80,
        'bg-violet-500 border-violet-300': percentageProgress >= 80,
      })} />


      <PopOver.Portal>
        <PopOver.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>
          <span className='font-semibold text-zinc-400'>Progress: {percentageProgress}%</span>

          <ProgressBar progress={percentageProgress} />

          <TaskList date={date} onCompletedChange={handleCompleteTaskChange}/>

          <PopOver.Arrow height={8} width={16} className='fill-zinc-900' />
        </PopOver.Content>
      </PopOver.Portal>

    </PopOver.Root>
  )
}