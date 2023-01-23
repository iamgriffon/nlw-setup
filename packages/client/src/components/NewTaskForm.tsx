import { trpc } from "@/utils/trpc";
import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox"
import { FormEvent, useState } from "react";

const AVAILABLE_WEEK_DAYS = [
  { id: 0, day: 'Sunday' },
  { id: 1, day: 'Monday' },
  { id: 2, day: 'Tuesday' },
  { id: 3, day: 'Wednesday' },
  { id: 4, day: 'Thursday' },
  { id: 5, day: 'Friday' },
  { id: 6, day: 'Saturday' },
]


export function NewTaskForm() {

  const [title, setTitle] = useState<string>('')
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const addTask = trpc.add_task.useMutation({
    onSuccess: () => {
      console.log('I succeded!');
      setWeekDays([]);
      setTitle('');
    },
  });

  function handleCreateTask(Event: FormEvent) {
    Event.preventDefault();

    if (!title || weekDays.length === 0) return;

    const input = {
      title: title,
      weekDays: weekDays
    }
    addTask.mutate(input)
  }

  function handleAddTaskDay(taskDay: number) {
    if (weekDays.includes(taskDay)) {
      const updatedWeekDays = weekDays.filter(day => day !== taskDay);
      setWeekDays(updatedWeekDays)
      console.log(updatedWeekDays)
    } else {
      const updatedWeekDays = [...weekDays, taskDay];
      setWeekDays(updatedWeekDays)
      console.log(updatedWeekDays)
    }
  }

  return (
    <form onSubmit={handleCreateTask} className='w-full flex flex-col mt-6'>
      <label htmlFor="title" className="font-semibold leading-tight">
        What is your commitment?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex: Workout, Study, Do homework, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        required
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        What is the recurring rate?
      </label>


      <div className="mt-6 flex flex-col gap-3">
        {AVAILABLE_WEEK_DAYS.map((day, index) => {
          return (
            <Checkbox.Root
              defaultChecked={false}
              className='flex items-center gap-3 group'
              key={day.id}
              onClick={() => handleAddTaskDay(day.id)}
              checked={weekDays.includes(index)}
            >

              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                <Checkbox.Indicator>
                  <Check size={20} className='text-white' />
                </Checkbox.Indicator>
              </div>

              <span className='font-semibold text-white leading-tight'>
                {day.day}
              </span>
            </Checkbox.Root>
          )
        })}
      </div>

      <button type="submit" className="mt-6 rounded-lg p-4 flex gap-3 items-center justify-center font-semibold bg-green-600 hover:bg-green-500">
        Confirm
        <Check size={20} weight='bold' />
      </button>
    </form>
  );
}

