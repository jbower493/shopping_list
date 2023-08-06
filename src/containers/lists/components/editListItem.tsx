import React from 'react'
import { useRemoveItemFromListMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'

interface EditListItemProps {
    item: {
        name: string
        id: number
    }
    listId: number
    setAnyChanges: (anyChanges: boolean) => void
}

function EditListItem({ item: { name, id }, listId, setAnyChanges }: EditListItemProps) {
    const { mutate: removeItemFromList } = useRemoveItemFromListMutation()

    return (
        <li className='flex justify-between w-full max-w-md mb-2'>
            {name}
            <button
                type='button'
                onClick={() => {
                    removeItemFromList(
                        { listId: listId.toString(), itemId: id },
                        {
                            onSuccess: () => {
                                setAnyChanges(true)
                            }
                        }
                    )
                }}
            >
                <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
            </button>
        </li>
    )
}

export default EditListItem
