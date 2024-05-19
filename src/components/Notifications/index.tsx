import { BellIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNotificationsQuery } from './queries'

export function Notifications() {
    const [isListShowing, setIsListShowing] = useState(false)
    const [isAcceptRecipeLightboxShowing, setIsAcceptRecipeLightboxShowing] = useState(false)

    const { data: notificationsData } = useNotificationsQuery()

    if (!notificationsData || notificationsData.notifications.length <= 0) {
        return null
    }

    function renderList() {
        if (!isListShowing || !notificationsData) {
            return null
        }

        return (
            <ul className='absolute top-8 right-0 w-80 bg-white border-primary border'>
                {notificationsData.notifications.map(({ share_request_id, owner_name, recipe_name }) => {
                    return (
                        <li key={share_request_id}>
                            <button
                                className='py-1 px-2 w-full text-left text-sky-500 hover:text-sky-600 hover:underline overflow-hidden whitespace-nowrap text-ellipsis'
                                type='button'
                                onClick={() => setIsAcceptRecipeLightboxShowing(true)}
                            >
                                {owner_name} shared &quot;{recipe_name}&quot; with you
                            </button>
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className='relative'>
            <button type='button' className='relative' onClick={() => setIsListShowing((prev) => !prev)}>
                <BellIcon className='w-7' />
                <div className='bg-error text-white text-sm font-bold w-5 h-5 rounded-full absolute -top-1 -left-1 flex justify-center items-center'>
                    1
                </div>
            </button>
            {renderList()}
        </div>
    )
}
