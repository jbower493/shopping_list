import { _ButtonMenuItem as ButtonMenuItem } from './ButtonMenuItem'
import { _Dropdown as Dropdown } from './component'
import { _LinkMenuItem as LinkMenuItem } from './LinkMenuItem'

const Component = Object.assign(Dropdown, {
    MenuItem: {
        Button: ButtonMenuItem,
        Link: LinkMenuItem
    }
})

export { Component as Dropdown }
