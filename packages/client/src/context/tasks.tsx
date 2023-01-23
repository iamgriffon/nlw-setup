import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@/server/router/_app';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { trpc } from '@/utils/trpc';

export type TaskDayData = inferRouterOutputs<AppRouter>['get_tasks']

interface TaskContextProps {
  tasks: TaskDayData,
}

interface TaskContextProviderProps {
  children: ReactNode
}

const TaskContext = createContext({} as TaskContextProps);


export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [tasks, setTasks] = useState<TaskDayData>([]);
  const data = trpc.get_tasks.useQuery().data;

  useEffect(() => {
    if (data) setTasks(data)
  }, [data])
 
  return (
    <TaskContext.Provider value={{ tasks }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() { return useContext(TaskContext) }