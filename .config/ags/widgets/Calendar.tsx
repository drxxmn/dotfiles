import { Variable } from "astal"
import { Gtk } from "astal/gtk3"
import { revealCalendarMenu } from "../windows/bar/menu/vars"

function generateGridDates(month: number, year: number) {
  function daysInMonth(month: number, year: number): Date[] {
    const days = []
    const lastDay = new Date(year, month, 0).getDate()
    for (let i = 1; i <= lastDay; i++) {
      days.push(new Date(year, month - 1, i))
    }
    return days
  }

  const firstDayOfMonth = new Date(year, month - 1, 1)
  const lastDayOfMonth = new Date(year, month, 0)

  const weekStart = 1 // Monday
  const daysOfWeek = 7

  const firstWeekDay = (firstDayOfMonth.getDay() - weekStart + daysOfWeek) % daysOfWeek
  const lastWeekDay = (lastDayOfMonth.getDay() - weekStart + daysOfWeek) % daysOfWeek

  const prevMonth = month - 1 || 12
  const nextMonth = month === 12 ? 1 : month + 1
  const prevYear = month === 1 ? year - 1 : year
  const nextYear = month === 12 ? year + 1 : year

  const prevMonthDays = daysInMonth(prevMonth, prevYear)
  const nextMonthDays = daysInMonth(nextMonth, nextYear)

  const leadingDays = firstWeekDay
  const trailingDays = daysOfWeek - 1 - lastWeekDay

  const days = []
  if (leadingDays > 0) {
    days.push(...prevMonthDays.slice(-leadingDays).map(date => ({ inCurrent: false, date })))
  }
  days.push(...daysInMonth(month, year).map(date => ({ inCurrent: true, date })))
  if (trailingDays > 0) {
    days.push(...nextMonthDays.slice(0, trailingDays).map(date => ({ inCurrent: false, date })))
  }

  while (days.length < 42) {
    days.push({ inCurrent: false, date: new Date(nextYear, nextMonth - 1, days.length) })
  }

  const weeks = []
  for (let i = 0; i < days.length; i += daysOfWeek) {
    weeks.push(days.slice(i, i + daysOfWeek))
  }

  return weeks
}

export default function Calendar() {
  const currentDate = new Date()
  const pageDate = Variable(currentDate)
  const grid = Variable(generateGridDates(currentDate.getMonth() + 1, currentDate.getFullYear()))

  pageDate.subscribe(date => {
    grid.set(generateGridDates(date.getMonth() + 1, date.getFullYear()))
  })

  revealCalendarMenu.subscribe(v => {
    if (!v) pageDate.set(currentDate)
  })

  return (
    <box vertical spacing={8} className="calendar-widget">
      <box className="calendar-header" hexpand spacing={8}>
        <button
          onClicked={() => pageDate.set(new Date())}
          className="calendar-title-button"
        >
          <label
            label={pageDate(date =>
              date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
            )}
            className="calendar-title"
            halign="start"
          />
        </button>

        <box hexpand />

        <box spacing={4} className="calendar-controls" halign="end">
          <button className="calendar-nav" onClicked={() => {
            const d = new Date(pageDate.get())
            d.setMonth(d.getMonth() - 1)
            pageDate.set(d)
          }}>‹</button>

          <button className="calendar-nav" onClicked={() => {
            const d = new Date(pageDate.get())
            d.setMonth(d.getMonth() + 1)
            pageDate.set(d)
          }}>›</button>
        </box>
      </box>

      <box spacing={4} hexpand homogeneous>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
          <label label={day} className="calendar-day-name" />
        ))}
      </box>

      <box
        className="calendar-divider"
        heightRequest={1}
        hexpand={true}
      />

      <box vertical spacing={4} hexpand>
        {grid(weeks =>
          weeks.map(week => (
            <box spacing={4} hexpand homogeneous>
              {week.map(day => (
                <label
                  label={day.date.getDate().toString()}
                  className={["calendar-day"].concat([
                    !day.inCurrent ? "not-in-month" : "",
                    day.date.toDateString() === currentDate.toDateString() ? "today" : ""
                  ]).join(" ")}
                />
              ))}
            </box>
          ))
        )}
      </box>
    </box>
  )
}
