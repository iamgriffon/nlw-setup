interface TaskDaySquareProps {
  completed?: boolean
}

export function TaskDaySquare(props: TaskDaySquareProps){
  return <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-pointer"/>
}