import { AppRouter } from "@/server/router/_app";
import { generateRangeDatesFromYearStart } from "@/utils/generate-range-between-dates";
import { trpc } from "@/utils/trpc";
import { inferRouterOutputs } from "@trpc/server";
import { TaskDaySquare } from "./TaskDaySquare"
import dayjs from 'dayjs'
import { useMemo } from "react";

type RouterOutput = inferRouterOutputs<AppRouter>

export function SummaryTable() {

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

  const summary = trpc.get_tasks.useQuery().data;

  useMemo(() => {
    summary
  }, [summary])

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
        {summaryDates.map(date => {
          const dayInSummary = summary?.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <TaskDaySquare
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount || 0}
              completed={dayInSummary?.completedTasks}
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
