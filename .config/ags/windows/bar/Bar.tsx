// ✅ Final Bar.tsx – Yume-style layout with fixed-width sidebar that doesn't collapse
import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { exec } from "astal";

import Workspaces from "../../widgets/Workspaces";
import Battery from "../../widgets/Battery";
import { Clock } from "../../widgets/Clock";

import SideBar from "./sidebar/SideBar";
import { revealSideBar, sideBarShown } from "./sidebar/vars";

function Divider() {
  return <box className="divider" />;
}

function StartSection() {
  return (
    <box
      className="start"
      valign={Gtk.Align.START}
      halign={Gtk.Align.CENTER}
      spacing={4}
      vertical={true}
    >
      <button
        className="sidebar_button"
        cursor="pointer"
        onClick={() => {
          if (!revealSideBar.get()) {
            sideBarShown.set("home");
            revealSideBar.set(true);
          } else if (sideBarShown.get() === "home") {
            revealSideBar.set(false);
          } else {
            sideBarShown.set("home");
          }
        }}
      >
        <box css={`background-image: url("/home/${exec("whoami")}/.face")`} />
      </button>

      <Divider />

      <button
        className={
          sideBarShown((shown) =>
            shown === "appLauncher" ? "search_button active" : "search_button"
          )
        }
        cursor="pointer"
        onClick={() => {
          if (!revealSideBar.get()) {
            sideBarShown.set("appLauncher");
            revealSideBar.set(true);
          } else if (sideBarShown.get() === "appLauncher") {
            revealSideBar.set(false);
          } else {
            sideBarShown.set("appLauncher");
          }
        }}
      >
        <label label="" />
      </button>
    </box>
  );
}

function CenterSection({ monitor }: { monitor: Gdk.Monitor }) {
  return (
    <box
      className="widget-box"
      vertical={true}
      spacing={8}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
    >
      <Workspaces monitor={monitor} />
    </box>
  );
}

function EndSection() {
  return (
    <box
      className="end"
      vertical={true}
      spacing={8}
      valign={Gtk.Align.END}
      halign={Gtk.Align.CENTER}
    >
      <Battery />
      <Clock />
    </box>
  );
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name="bar"
      className="bar"
      gdkmonitor={gdkmonitor}
      application={App}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT
      }
      css="margin: 8px;"
    >
      <box spacing={0}>
        {/* Sidebar rendered first, with fixed width */}
        <SideBar />

        {/* Main bar content */}
        <centerbox className="sections" vertical={true} spacing={16}>
          <StartSection />
          <CenterSection monitor={gdkmonitor} />
          <EndSection />
        </centerbox>
      </box>
    </window>
  );
}
