import { BellIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import { useNotificationsQuery } from './queries'
import AcceptSharedRecipeForm from 'containers/recipes/forms/acceptSharedRecipeForm'

export function Notifications() {
    const notificationIconRef = useRef<HTMLButtonElement | null>(null)

    const [isListShowing, setIsListShowing] = useState(false)
    const [shareRequestToAccept, setShareRequestToAccept] = useState<number | null>(null)

    const { data: notificationsData } = useNotificationsQuery()

    const handleClickAway = (e: MouseEvent) => {
        const target = e.target as Node
        if (notificationIconRef.current && !notificationIconRef.current.contains(target)) {
            setIsListShowing(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickAway)

        return () => document.removeEventListener('click', handleClickAway)
    }, [])

    if (!notificationsData || notificationsData.notifications.length <= 0) {
        return null
    }

    function renderList() {
        if (!isListShowing || !notificationsData) {
            return null
        }

        return (
            <ul className='absolute top-8 right-0 w-72 bg-white border-primary border'>
                {notificationsData.notifications.map(({ share_request_id, owner_name, recipe_name }) => {
                    return (
                        <li key={share_request_id}>
                            <button
                                className='py-1 px-2 w-full text-left text-sky-500 hover:text-sky-600 hover:underline overflow-hidden whitespace-nowrap text-ellipsis'
                                type='button'
                                onClick={() => setShareRequestToAccept(share_request_id)}
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
            <button ref={notificationIconRef} type='button' className='relative' onClick={() => setIsListShowing((prev) => !prev)}>
                <BellIcon className='w-7' />
                <div className='bg-error text-white text-sm font-bold w-5 h-5 rounded-full absolute -top-1 -left-1 flex justify-center items-center'>
                    1
                </div>
            </button>
            {renderList()}
            <AcceptSharedRecipeForm
                isOpen={!!shareRequestToAccept}
                onClose={() => setShareRequestToAccept(null)}
                shareRequestId={shareRequestToAccept || -1}
            />
        </div>
    )
}
