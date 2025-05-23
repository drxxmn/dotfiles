import { Gdk } from "astal/gtk3"
import { bind } from "astal"
import Hyprland from "gi://AstalHyprland"

type WorkspacesProps = {
  monitor: Gdk.Monitor
}

export default function Workspaces({ monitor }: WorkspacesProps) {
  const hypr = Hyprland.get_default()

  return (
    <eventbox
      className="bar-workspaces"
      onScroll={(_: unknown, e: Astal.ScrollEvent) => {
        const isDown = e.delta_y > 0
        hypr.dispatch("workspace", isDown ? "+1" : "-1")
      }}
    >
      <box
        className="workspace"
        vertical={true}
        spacing={3}
        halign="center"
      >
        {bind(hypr, "workspaces").as(wss =>
          wss
            .filter(ws => !(ws.id >= -99 && ws.id <= -2))  // Ignore special workspaces
            .filter(ws => ws.monitor?.name === getMonitorName(monitor))
            .sort((a, b) => a.id - b.id) // ✅ Sort them numerically
            .map(ws => (
              <button
                className={bind(hypr, "focusedWorkspace").as(fw =>
                  ws === fw ? "workspace-btn active" : "workspace-btn"
                )}
                onClicked={() => ws.focus()}
              />
            ))
        )}
      </box>
    </eventbox>
  )
}

// Utility function to match monitor name
const display = Gdk.Display.get_default()

function getMonitorName(monitor: Gdk.Monitor) {
  if (!display) return null
  const screen = display.get_default_screen()
  for (let i = 0; i < display.get_n_monitors(); ++i) {
    if (monitor === display.get_monitor(i)) {
      return screen.get_monitor_plug_name(i)
    }
  }
  return null
}
