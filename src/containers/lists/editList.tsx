import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleListQuery, useAddItemToListMutation, useRemoveItemFromListMutation } from 'utils/api/lists'
import { useGetItemsQuery } from 'utils/api/items'
import Loader from 'components/Loader'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'

function EditList() {
    const [itemToAdd, setItemToAdd] = useState<string>('')

    const { listId } = useParams()

    const { data: listData, isFetching: isGetListFetching, isError: isGetListError } = useGetSingleListQuery(listId || '')
    const { data: itemsData, isFetching: isGetItemsFetching, isError: isGetItemsError } = useGetItemsQuery()

    const [addItemToList, { isLoading: isAddItemLoading }] = useAddItemToListMutation()
    const [removeItemFromList] = useRemoveItemFromListMutation()

    if (isGetListFetching || isGetItemsFetching) return <Loader fullPage />
    if (isGetListError || !listData || isGetItemsError || !itemsData) return <h1>List error</h1>

    const { name, id, items } = listData

    const renderCurrentItems = () => {
        return (
            <>
                <h3 className='mb-2'>Items</h3>
                <ul>
                    {items.map(({ name, id: itemId }, index) => (
                        <li key={index} className='flex justify-between w-full max-w-md mb-2'>
                            {name}
                            <button type='button' onClick={() => removeItemFromList({ listId: id.toString(), itemId })}>
                                <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                            </button>
                        </li>
                    ))}
                </ul>
            </>
        )
    }

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Edit List</h2>
            <p className='text-secondary-500 mb-8'>Name: {name}</p>
            {renderCurrentItems()}
            <label htmlFor='addItem' className='mt-8'>
                Add Item
            </label>
            <div className='flex items-center'>
                <select id='addItem' name='addItem' value={itemToAdd} onChange={(e) => setItemToAdd(e.target.value)} className='w-80 mb-0 mr-4'>
                    <option value='' disabled>
                        Select an item...
                    </option>
                    {itemsData.map(({ name, id }) => (
                        <option key={id} value={id.toString()}>
                            {name}
                        </option>
                    ))}
                </select>
                {isAddItemLoading ? (
                    <Loader size={'small'} />
                ) : (
                    <button onClick={() => addItemToList({ listId: id.toString(), itemId: Number(itemToAdd) })}>
                        <PlusIcon className='w-8 text-primary hover:text-primary-hover' />
                    </button>
                )}
            </div>
        </div>
    )
}

export default EditList
