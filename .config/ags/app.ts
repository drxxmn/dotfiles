import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./windows/bar/Bar"
import ContentWindow from "./windows/bar/sidebar/ContentWindow"
import CalendarMenu from "./windows/bar/menu/CalendarMenu"

App.start({
    css: style,
    main() {
        const mainMonitor = App.get_monitors().at(0)!
        Bar(mainMonitor)
        ContentWindow()
        CalendarMenu()
    },
})
