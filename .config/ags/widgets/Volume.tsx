import { bind } from "astal"
import Wp from "gi://AstalWp"

export const Volume = () => {
	const wp = Wp.get_default()
	if (!wp) return <label>🔇 Audio service unavailable</label>

	const speaker = bind(wp.audio, "defaultSpeaker")

	return (
		<box spacing={6}>
			{speaker.as((spk) => {
				if (!spk) return <label>🔇 No output</label>

				const volume = bind(spk, "volume")

				return (
					<eventbox
						onScroll={(_: unknown, e: Astal.ScrollEvent) => {
							spk.volume += e.delta_y < 0 ? 0.01 : -0.01
						}}
						onClick={() => {
							spk.mute = !spk.mute
						}}
					>
						<box spacing={6}>
							<icon icon={bind(spk, "volumeIcon")} />
							<label>
								{volume.as((v) =>
									isNaN(v) ? "0%" : `${Math.round(v * 100)}%`
								)}
							</label>
							<slider
								vexpand={false}
								hexpand={false}
								widthRequest={100}
								value={volume}
								onValueChanged={(self) => {
									spk.volume = self.value ?? 0
								}}
							/>
						</box>
					</eventbox>
				)
			})}
		</box>
	)
}
