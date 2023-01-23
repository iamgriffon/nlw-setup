import { trpc } from '@/utils/trpc';
import * as PopOver from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs'
import { TaskDayPopOver } from './TaskDayPopOver';

interface TaskDaySquareProps {
  date: dayjs.Dayjs
  amount?: number
  completed?: number
}

export function TaskDaySquare({ amount = 0, completed = 0, date }: TaskDaySquareProps) {
  const percentageProgress = amount > 0 ? Math.round((completed / amount) * 100) : 0;
  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');
  const getDate = date.toISOString()
  const currentTasks = trpc.get_tasks.useQuery().data

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


      <TaskDayPopOver dayAndMonth={dayAndMonth} dayOfWeek={dayOfWeek} percentageProgress={percentageProgress} date={date.toISOString()} currentTasks={currentTasks} />

    </PopOver.Root>
  )
}