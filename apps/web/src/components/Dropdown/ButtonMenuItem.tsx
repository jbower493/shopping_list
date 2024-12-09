import { MenuItem } from '@headlessui/react'
import { ReactNode } from 'react'

type ButtonMenuItemProps = {
    children: ReactNode
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function _ButtonMenuItem({ children, onClick }: ButtonMenuItemProps) {
    return (
        <MenuItem>
            <button onClick={onClick} className='group flex w-full items-center gap-2 rounded py-1.5 px-3 data-[focus]:bg-black/5'>
                {children}
            </button>
        </MenuItem>
    )
}
