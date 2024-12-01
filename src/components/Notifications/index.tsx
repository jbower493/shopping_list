import { BellIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import { useNotificationsQuery } from './queries'
import { Link } from 'react-router-dom'
import { useClickAway } from 'utils/hooks'

export function Notifications() {
    const notificationIconRef = useRef<HTMLButtonElement | null>(null)

    const [isListShowing, setIsListShowing] = useState(false)

    const { data: notificationsData } = useNotificationsQuery()

    useClickAway([notificationIconRef], () => setIsListShowing(false))
    if (!notificationsData || notificationsData.notifications.length <= 0) {
        return null
    }

    function renderList() {
        if (!isListShowing || !notificationsData) {
            return null
        }

        return (
            <ul className='absolute top-8 right-0 w-80 bg-white border-primary border'>
                {notificationsData.notifications.map(({ type, meta }) => {
                    if (type === 'share_request') {
                        const { share_request_id, owner_name, recipe_name } = meta

                        return (
                            <li key={`share-request_${share_request_id}`}>
                                <Link
                                    className='py-1 px-2 block w-full text-left text-sky-500 hover:text-sky-600 hover:underline overflow-hidden whitespace-nowrap text-ellipsis'
                                    to={`/recipes/accept-shared/${share_request_id}`}
                                >
                                    {owner_name} shared &quot;{recipe_name}&quot; with you
                                </Link>
                            </li>
                        )
                    }

                    const {
                        imported_recipe_id,
                        recipe: { name }
                    } = meta

                    return (
                        <li key={`imported-recipe_${imported_recipe_id}`}>
                            <Link
                                className='py-1 px-2 block w-full text-left text-sky-500 hover:text-sky-600 hover:underline overflow-hidden whitespace-nowrap text-ellipsis'
                                to={`/recipes/confirm-import/${imported_recipe_id}`}
                            >
                                Confirm recipe &quot;{name}&quot; imported from chrome
                            </Link>
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
                    {notificationsData?.notifications.length || 0}
                </div>
            </button>
            {renderList()}
        </div>
    )
}
