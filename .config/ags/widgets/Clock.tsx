import { Variable } from "astal"
import { revealCalendarMenu } from "../windows/bar/menu/vars"

const time = Variable("").poll(1000, "date +%H:%M")

export const Clock = () => (
 <box className="widget-box widget-clock" vertical halign="center">
  <button
    className="bar-clock"
    cursor="pointer"
    onClick={() => revealCalendarMenu.set(!revealCalendarMenu.get())}
    halign="center"
  >
    {time(str => {
      const [hour, minute] = str.split(":")
      return (
        <box vertical spacing={0} halign="center" valign="center">
          <label label={hour} className="bar-clock-hour" halign="center" />
          <label label={minute} className="bar-clock-minute" halign="center" />
        </box>
      )
    })}
  </button>
</box>

)
