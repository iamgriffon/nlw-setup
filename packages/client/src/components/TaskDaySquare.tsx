import * as PopOver from '@radix-ui/react-popover';
import clsx from 'clsx';
import { CheckBox } from './Checkbox';
import { ProgressBar } from './ProgressBar';
import dayjs from 'dayjs'

interface TaskDaySquareProps {
  date: Date
  amount?: number
  completed?: number
}

export function TaskDaySquare({ amount = 0, completed = 0, date }: TaskDaySquareProps) {
  const percentageProgress = amount > 0 ? Math.round((completed / amount) * 100) : 0;
  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd')

  return (
    <PopOver.Root>
      <PopOver.Trigger className={clsx("w-10 h-10 border-2 rounded-lg", {
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

          <div className="mt-6 flex flex-col gap-3">
            <CheckBox title='Drink 2L of water'/>
            <CheckBox title='Study NextJS '/>
            <CheckBox title='Raid Progress w/ Guild'/>
            <CheckBox title='Do Homework'/>
          </div>

          <PopOver.Arrow height={8} width={16} className='fill-zinc-900' />
        </PopOver.Content>
      </PopOver.Portal>
    </PopOver.Root>
  )
}