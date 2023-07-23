import React from 'react'
import { getSingleListKey, useRemoveItemFromListMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'
import Loader from 'components/Loader'
import { queryClient } from 'utils/queryClient'

interface EditListItemProps {
    item: {
        name: string
        id: number
    }
    listId: number
    setAnyChanges: (anyChanges: boolean) => void
}

function EditListItem({ item: { name, id }, listId, setAnyChanges }: EditListItemProps) {
    const { mutate: removeItemFromList, isLoading: isRemoveItemFromListLoading } = useRemoveItemFromListMutation()

    return (
        <li className='flex justify-between w-full max-w-md mb-2'>
            {name}
            {isRemoveItemFromListLoading ? (
                <Loader size='small' />
            ) : (
                <button
                    type='button'
                    onClick={() => {
                        removeItemFromList(
                            { listId: listId.toString(), itemId: id },
                            {
                                onSuccess: () => {
                                    setAnyChanges(true)
                                    queryClient.invalidateQueries(getSingleListKey)
                                }
                            }
                        )
                    }}
                >
                    <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                </button>
            )}
        </li>
    )
}

export default EditListItem
