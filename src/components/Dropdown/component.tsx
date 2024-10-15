import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React, { ReactElement } from 'react'

export type DropdownProps = {
    menuItems: ReactElement[]
    /**
     * If "menuButton" is provided as a string, a down chevron will be displayed after the string.
     */
    menuButton: string | ReactElement
    dropdownClassName?: string
    menuButtonClassName?: string
}

export function _Dropdown({ menuItems, menuButton, dropdownClassName, menuButtonClassName }: DropdownProps) {
    return (
        <div className={`relative${dropdownClassName ? ' ' + dropdownClassName : ''}`}>
            <Menu>
                <MenuButton
                    className={`inline-flex items-center gap-2 rounded bg-white py-1.5 px-3 text-sm/6 font-medium text-primary border border-primary focus:outline-none${
                        menuButtonClassName ? ' ' + menuButtonClassName : ''
                    }`}
                >
                    {menuButton}
                    {typeof menuButton === 'string' ? <ChevronDownIcon className='size-4' /> : null}
                </MenuButton>

                <MenuItems
                    transition
                    anchor='bottom end'
                    className='absolute w-40 mt-1 origin-top-right rounded border bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-10'
                >
                    {React.Children.toArray(menuItems)}
                </MenuItems>
            </Menu>
        </div>
    )
}
