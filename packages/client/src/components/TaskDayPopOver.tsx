
import { useTasks } from '@/context/tasks';
import { AppRouter } from '@/server/router/_app';
import { trpc } from '@/utils/trpc';
import * as PopOver from '@radix-ui/react-popover';
import { inferRouterOutputs } from '@trpc/server';
import { CheckBox } from './Checkbox';
import { ProgressBar } from './ProgressBar';

interface TaskDayPopOverProps {
  percentageProgress: number
  dayOfWeek: string
  dayAndMonth: string
  date: string
  currentTasks?: inferRouterOutputs<AppRouter>['get_tasks']
}

export function TaskDayPopOver({ dayAndMonth, dayOfWeek, date, percentageProgress, currentTasks }: TaskDayPopOverProps) {

  const allTasks = trpc.get_tasks_by_day.useQuery({ date: date }).data

  function taskSolver() {
    console.log('TASKARRAY', currentTasks)
    console.log('IDARRAY', { completedTasks: allTasks?.completedTasks, possibleTasks: allTasks?.possibleTasks })
  }

  taskSolver()

  return (
    <PopOver.Portal>
      <PopOver.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
        <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
        <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>
        <span className='font-semibold text-zinc-400'>Progress: {percentageProgress}%</span>

        <ProgressBar progress={percentageProgress} />

        <div className="mt-6 flex flex-col gap-3">
          <CheckBox title='Drink 2L of water' />
          <CheckBox title='Study NextJS ' />
          <CheckBox title='Raid Progress w/ Guild' />
          <CheckBox title='Do Homework' />
        </div>

        <PopOver.Arrow height={8} width={16} className='fill-zinc-900' />
      </PopOver.Content>
    </PopOver.Portal>
  );
}