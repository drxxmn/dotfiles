import { Gtk } from 'astal/gtk3';

export default function () {
  return (
    <box
      className="home"
      vertical={true}
      spacing={12}
      halign={Gtk.Align.FILL}
      valign={Gtk.Align.FILL}
    >
      <label
        className="section-title"
        label="Home Section"
        xalign={0}
      />
      {/* Add buttons or system controls here */}
    </box>
  );
}
