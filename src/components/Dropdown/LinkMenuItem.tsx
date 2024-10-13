import { MenuItem } from '@headlessui/react'
import { ReactNode } from 'react'
import { Link, To } from 'react-router-dom'

type LinkMenuItemProps = {
    children: ReactNode
    to: To
}

export function _LinkMenuItem({ children, to }: LinkMenuItemProps) {
    return (
        <MenuItem>
            <Link
                to={to}
                className='group flex w-full items-center gap-2 rounded py-1.5 px-3 text-black hover:no-underline hover:text-black data-[focus]:bg-black/5'
            >
                {children}
            </Link>
        </MenuItem>
    )
}
