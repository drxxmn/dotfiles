declare const SRC: string

declare module "inline:*" {
    const content: string
    export default content
}

declare module "*.scss" {
    const content: string
    export default content
}

declare module "*.blp" {
    const content: string
    export default content
}

declare module "*.css" {
    const content: string
    export default content
}

// Fix AGS JSX type errors for 'children' on <window>, <box>, <button>, etc.
declare namespace JSX {
  interface WindowProps {
    children?: any
    [key: string]: any
  }

  interface BoxProps {
    children?: any
    [key: string]: any
  }

  interface ButtonProps {
    children?: any
    [key: string]: any
  }


  interface EventBoxProps {
    children?: any
    [key: string]: any
  }

   interface CenterBoxProps {
    children?: any
    [key: string]: any
  }


  interface IntrinsicElements {
    window: WindowProps
    box: BoxProps
    button: ButtonProps
    eventbox: EventBoxProps
    centerbox: CenterBoxProps
    label: any
    revealer: any
    icon: any
    [key: string]: any
  }
}

// Basic type definition for scroll event
declare namespace Astal {
  interface ScrollEvent {
    delta_x: number
    delta_y: number
    direction: number
  }
}
