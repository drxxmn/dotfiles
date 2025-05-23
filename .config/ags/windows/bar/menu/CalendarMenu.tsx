import { App, Astal, Gtk } from "astal/gtk3"
import Calendar from "../../../widgets/Calendar"
import { revealCalendarMenu } from "./vars"

export default function CalendarMenu() {
  return (
    <window
      name="calendar"
      application={App}
      anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      layer={Astal.Layer.TOP}
      decorated={false}
      appPaintable={true}
      setup={(self: Gtk.Window) => {
        App.add_window(self)
        self.set_visual(self.get_screen()?.get_rgba_visual())
      }}
    >
      <revealer
        revealChild={revealCalendarMenu()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        transitionDuration={200}
      >
        <box
          css="padding-left: 11px; padding-bottom: 12px;" // ✅ Offsets actual content
        >
          <box
            className="calendar_menu menu"
            css="background-color: rgba(30, 30, 46, 0.95); border-radius: 16px; padding: 16px; min-width: 240px; min-height: 180px;"
          >
            <Calendar />
          </box>
        </box>
      </revealer>
    </window>
  )
}
