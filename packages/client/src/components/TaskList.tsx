import { AppRouter } from '@/server/router/_app';
import { trpc } from '@/utils/trpc';
import * as Checkbox from '@radix-ui/react-checkbox';
import { inferRouterOutputs } from '@trpc/server';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'


interface TaskListProps {
  date: Date
  onCompletedChange: (param: number) => void
}

type TaskList = inferRouterOutputs<AppRouter>['get_tasks_by_day']

export function TaskList({ date, onCompletedChange }: TaskListProps) {

  const [taskList, setTaskList] = useState<TaskList>();

  const { data, isLoading } = trpc.get_tasks_by_day.useQuery({ date: date.toISOString() });
  const { mutate } = trpc.toggle_task.useMutation()

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  useEffect(() => {
    if (isLoading === false && data) setTaskList(data)
    console.log('Data', data)
  }, [isLoading, data, date]);

  function handleToggleTask(taskId: string){
    const isTaskCompleted = taskList!.completedTasks.includes(taskId);
    let completedTasks: (string | undefined)[] = [];
    mutate(taskId, {
      onSuccess: () => {
        if (isTaskCompleted) {
          completedTasks = taskList!.completedTasks.filter(id => id !== taskId)
        } else {
          completedTasks = [...taskList!.completedTasks, taskId]
        }
        setTaskList({
          possibleTasks: taskList!.possibleTasks,
          completedTasks
        })
        onCompletedChange(completedTasks.length)
      }, 
      onError: () => console.log('An error ocurred')
    })
  }

  return (
    <div className="mt-6 flex flex-col gap-3">

      {taskList?.possibleTasks && taskList!.possibleTasks.map(task => (
        <Checkbox.Root 
          key={task?.id}
          className='flex items-center gap-3 group'
          onCheckedChange={() => {
            if (task) {
              handleToggleTask(task.id)
            }
          }}
          disabled={isDateInPast}
          checked={taskList?.completedTasks.includes(task?.id)}>

          <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors'>
            <Checkbox.Indicator>
              <Check size={20} className='text-white' />
            </Checkbox.Indicator>
          </div>

          <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
            {task?.title}
          </span>
        </Checkbox.Root>
      ))}


    </div>
  );
}