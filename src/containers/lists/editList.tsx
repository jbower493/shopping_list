import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetSingleListQuery, useAddItemToListMutation } from 'utils/api/lists'
import { useGetItemsQuery } from 'utils/api/items'
import Loader from 'components/Loader'
import { PlusIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/outline'
import EditListItem from 'containers/lists/components/editListItem'
import ComboBox from 'components/Form/Inputs/Combobox'

function EditList() {
    const [itemToAdd, setItemToAdd] = useState<string>('')
    const [anyChanges, setAnyChanges] = useState<boolean>(false)

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
                        <EditListItem key={index} item={item} listId={id} setAnyChanges={setAnyChanges} />
                    ))}
                </ul>
            </>
        )
    }

    return (
        <div className='p-4'>
            <Link to='/lists'>Back to lists</Link>
            <div className='flex justify-between mb-7 mt-2'>
                <h2>Edit List</h2>
                <div className='flex items-center'>
                    {anyChanges ? (
                        <small className='opacity-40 flex items-center text-sm mr-2'>
                            <CheckIcon className='w-4 h-4 mr-1' />
                            Saved
                        </small>
                    ) : (
                        ''
                    )}
                    <ClipboardDocumentListIcon className='mr-2 w-7 text-primary' />
                    <p>{name}</p>
                </div>
            </div>
            <label htmlFor='addItem'>Add Item</label>
            <div className='flex items-center mb-7'>
                <ComboBox value={itemToAdd} setValue={setItemToAdd} options={itemsData.map(({ name }) => name)} />
                {isAddItemLoading ? (
                    <Loader size={'small'} />
                ) : (
                    <button
                        onClick={() => {
                            addItemToList({ listId: id.toString(), itemName: itemToAdd })
                                .unwrap()
                                .then(() => setAnyChanges(true))
                        }}
                    >
                        <PlusIcon className='w-8 text-primary hover:text-primary-hover' />
                    </button>
                )}
            </div>
            {renderCurrentItems()}
        </div>
    )
}

export default EditList
