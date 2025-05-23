import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./windows/bar/Bar"
import CalendarMenu from "./windows/bar/menu/CalendarMenu" // 👈 ADD THIS LINE

App.start({
    css: style,
    main() {
        const mainMonitor = App.get_monitors().at(0)!
        Bar(mainMonitor)
        CalendarMenu() // 👈 ADD THIS LINE TO RENDER THE CALENDAR WINDOW
    },
})
