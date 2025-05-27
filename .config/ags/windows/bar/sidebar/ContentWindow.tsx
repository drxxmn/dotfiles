import { App, Astal, Gtk } from "astal/gtk3";
import Home from "./home/Home";
import AppLauncher from "./appLauncher/AppLauncher";
import { showContentWindow, sideBarShown } from "./vars";

const ANIMATION_SPEED = 400;

export default function ContentWindow() {
  return (
    <window
      name="content"
      className="content-window"
      application={App}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
      layer={Astal.Layer.TOP}
      decorated={false}
      appPaintable={true}
      visible={false}
      setup={(self: Gtk.Window) => {
        App.add_window(self);
        self.set_visual(self.get_screen()?.get_rgba_visual());

        // Set initial state
        self.set_visible(false);
        
        // Handle visibility changes
        showContentWindow.subscribe(visible => {
          if (visible) {
            self.set_visible(true);
          }
        });
      }}
    >
      <revealer
        revealChild={false}
        transitionType={Gtk.RevealerTransitionType.CROSSFADE}
        transitionDuration={ANIMATION_SPEED}
        setup={(self: Gtk.Revealer) => {
          // Set initial state
          self.set_reveal_child(false);
          
          let transitioning = false;
          
          // Subscribe to show/hide events
          showContentWindow.subscribe(visible => {
            if (!transitioning) {
              self.set_reveal_child(visible);
            }
          });

          // Handle animation completion
          self.connect('notify::child-revealed', () => {
            const revealed = self.get_child_revealed();
            const win = self.get_ancestor(Gtk.Window.$gtype) as Gtk.Window;
            
            transitioning = false;
            
            if (win && !revealed) {
              win.set_visible(false);
            }
          });
          
          // Track when animation starts
          self.connect('notify::reveal-child', () => {
            transitioning = true;
          });
        }}
      >
        <box>
          <box
            className="content-container"
            css="min-width: 300px; padding: 12px; background-color: @theme_bg_color; border-radius: 12px;"
            vertical={true}
            vexpand={true}
          >
            <stack
              transitionType={Gtk.StackTransitionType.CROSSFADE}
              transitionDuration={ANIMATION_SPEED}
              setup={(stack) => {
                stack.add_named(Home(), "home");
                stack.add_named(AppLauncher(), "appLauncher");

                sideBarShown.subscribe((name) => {
                  if (name) {
                    stack.set_visible_child_name(name);
                  }
                });
              }}
            />
          </box>
        </box>
      </revealer>
    </window>
  );
} 