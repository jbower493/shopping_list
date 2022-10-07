import React from 'react'
import { useRemoveItemFromListMutation } from 'utils/api/lists'
import { TrashIcon } from '@heroicons/react/24/solid'
import Loader from 'components/Loader'

interface EditListItemProps {
    item: {
        name: string
        id: number
    }
    listId: number
}

function EditListItem({ item: { name, id }, listId }: EditListItemProps) {
    const [removeItemFromList, { isLoading }] = useRemoveItemFromListMutation()

    return (
        <li className='flex justify-between w-full max-w-md mb-2'>
            {name}
            {isLoading ? (
                <Loader size='small' />
            ) : (
                <button type='button' onClick={() => removeItemFromList({ listId: listId.toString(), itemId: id })}>
                    <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                </button>
            )}
        </li>
    )
}

export default EditListItem
