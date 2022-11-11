import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleListQuery, useAddItemToListMutation } from 'utils/api/lists'
import { useGetItemsQuery } from 'utils/api/items'
import Loader from 'components/Loader'
import { PlusIcon } from '@heroicons/react/24/solid'
import EditListItem from 'containers/lists/components/editListItem'
import ComboBox from 'components/Form/Inputs/Combobox'

const people = [
    { value: '1', label: 'Wade Cooper' },
    { value: '2', label: 'Arlene Mccoy' },
    { value: '3', label: 'Devon Webb' },
    { value: '4', label: 'Tom Cook' },
    { value: '5', label: 'Tanya Fox' },
    { value: '6', label: 'Hellen Schmidt' },
    { value: '7', label: 'Mate Smith' },
    { value: '8', label: 'Jonny English' }
]

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
            <h2 className='mb-4'>Edit List</h2>
            <p className='text-secondary-500 mb-8'>Name: {name}</p>
            {renderCurrentItems()}
            <label htmlFor='addItem' className='mt-8'>
                Add Item
            </label>
            <div className='flex items-center'>
                {/* <select id='addItem' name='addItem' value={itemToAdd} onChange={(e) => setItemToAdd(e.target.value)} className='w-80 mb-0 mr-4'>
                    <option value='' disabled>
                        Select an item...
                    </option>
                    {itemsData.map(({ name, id }) => (
                        <option key={id} value={id.toString()}>
                            {name}
                        </option>
                    ))}
                </select> */}
                {/* <input id='addItem' name='addItem' value={itemToAdd} onChange={(e) => setItemToAdd(e.target.value)} className='w-80 mb-0 mr-4' /> */}

                <ComboBox options={people} />

                {isAddItemLoading ? (
                    <Loader size={'small'} />
                ) : (
                    <button onClick={() => addItemToList({ listId: id.toString(), itemName: itemToAdd })}>
                        <PlusIcon className='w-8 text-primary hover:text-primary-hover' />
                    </button>
                )}
            </div>
        </div>
    )
}

export default EditList
