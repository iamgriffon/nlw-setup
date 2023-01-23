import { generateRangeDatesFromYearStart } from "@/utils/generate-range-between-dates";
import { TaskDaySquare } from "./TaskDaySquare"
import dayjs from 'dayjs'
import { Summary } from "@/pages";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";

export function SummaryTable() {

  const [summary, setSummary] = useState<Summary>([])
  const { data } = trpc.get_summary.useQuery();

  useEffect(() => {
    data ? setSummary(data) : setSummary([]);
  }, [data])

  const DAYS_OF_WEEK = [
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S'
  ];

  const summaryDates = generateRangeDatesFromYearStart();

  const minimumSummaryDatesSize = 18 * 7;
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;
  

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {DAYS_OF_WEEK.map((day, index) => (
          <div className="text-zinc-400 text-xl font-bold h-10 w-10 flex-center justify-center"
            key={`${day}-${index}`}>
            {day}
          </div>
        ))}
      </div>


      <div className="grid grid-rows-6 grid-flow-col gap-3">
        {summary.length > 0 && summaryDates.map(date => {
          const dayInSummary = summary?.find((day) => {
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <TaskDaySquare
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount || 0}
              defaultCompleted={dayInSummary?.completedTasks}
            />)
        })}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
          return (
            <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
          )
        })}
      </div>
    </div>
  )
}
