import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleListQuery, useAddItemToListMutation } from 'utils/api/lists'
import { useGetItemsQuery } from 'utils/api/items'
import Loader from 'components/Loader'
import { PlusIcon } from '@heroicons/react/24/solid'
import EditListItem from 'containers/lists/components/editListItem'
import ComboBox from 'components/Form/Inputs/Combobox'

function EditList() {
    const [itemToAdd, setItemToAdd] = useState<string>('')

    const { listId } = useParams()

    const { data: listData, isFetching: isGetListFetching, isError: isGetListError } = useGetSingleListQuery(listId || '')
    const { data: itemsData, isFetching: isGetItemsFetching, isError: isGetItemsError } = useGetItemsQuery()

    const [addItemToList, { isLoading: isAddItemLoading }] = useAddItemToListMutation()

    if (isGetListFetching || isGetItemsFetching) return <Loader fullPage />
    if (isGetListError || !listData || isGetItemsError || !itemsData) return <h1>List error</h1>

    const { name, id, items } = listData

    const renderCurrentItems = () => {
        return (
            <>
                <h3 className='mb-2'>Items</h3>
                <ul>
                    {items.map((item, index) => (
                        <EditListItem key={index} item={item} listId={id} />
                    ))}
                </ul>
            </>
        )
    }

    return (
        <div className='p-4'>
            <h2 className='mb-3'>Edit List</h2>
            <p className='text-secondary-500 mb-7'>Name: {name}</p>
            <label htmlFor='addItem' className='mt-7'>
                Add Item
            </label>
            <div className='flex items-center mb-7'>
                <ComboBox value={itemToAdd} setValue={setItemToAdd} options={itemsData.map(({ name }) => name)} />
                {isAddItemLoading ? (
                    <Loader size={'small'} />
                ) : (
                    <button onClick={() => addItemToList({ listId: id.toString(), itemName: itemToAdd })}>
                        <PlusIcon className='w-8 text-primary hover:text-primary-hover' />
                    </button>
                )}
            </div>
            {renderCurrentItems()}
        </div>
    )
}

export default EditList
