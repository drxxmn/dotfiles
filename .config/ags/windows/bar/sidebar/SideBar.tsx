import { Gtk } from 'astal/gtk3';
import Home from './home/Home';
import AppLauncher from './appLauncher/AppLauncher';
import {
  revealSideBar,
  sideBarShown,
  sideBarWidth,
} from './vars';

const ANIMATION_SPEED = 250;

export default function () {
  return (
    <revealer
      revealChild={revealSideBar()}
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      transitionDuration={ANIMATION_SPEED}
      setup={(self) => {
        self.connect('size-allocate', () => {
          sideBarWidth.set(self.get_allocated_width());
        });
      }}
    >
      <box
        className="sidebar-container"
        css="min-width: 300px; padding: 12px; transition: margin 250ms ease, opacity 250ms ease;"
        vertical={true}
        vexpand={true}
      >
        <stack
          transitionType={Gtk.StackTransitionType.SLIDE_RIGHT}
          transitionDuration={ANIMATION_SPEED}
          setup={(stack) => {
            stack.add_named(Home(), 'home');
            stack.add_named(AppLauncher(), 'appLauncher');

            sideBarShown.subscribe(name => {
              if (name) {
                stack.set_visible_child_name(name);
              }
            });
          }}
        />
      </box>
    </revealer>
  );
}
