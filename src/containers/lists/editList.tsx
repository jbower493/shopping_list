import React, { useState } from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'
import { useGetSingleListQuery, useAddItemToListMutation } from 'utils/api/lists'
import { useGetItemsQuery } from 'utils/api/items'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/outline'
import EditListItem from 'containers/lists/components/editListItem'
import CategoryTag from 'components/CategoryTag'
import { getExistingCategories } from 'utils/functions'
import AddItem from 'containers/lists/components/addItem'
import type { AddItemToListPayload } from 'containers/lists/types'

function EditList() {
    const [anyChanges, setAnyChanges] = useState<boolean>(false)

    const { listId } = useParams()

    const { data: listData, isFetching: isGetListFetching, isError: isGetListError } = useGetSingleListQuery(listId || '')
    const { data: itemsData, isFetching: isGetItemsFetching, isError: isGetItemsError } = useGetItemsQuery()

    const [addItemToList, { isLoading: isAddItemLoading }] = useAddItemToListMutation()

    if (isGetListFetching || isGetItemsFetching) return <Loader fullPage />
    if (isGetListError || !listData || isGetItemsError || !itemsData) return <h1>List error</h1>

    const { name, id: listIdSafe, items } = listData

    // Get a unique list of all the categories present in the list
    const categoriesInList = getExistingCategories(items)

    const renderCurrentItems = () => {
        const renderCategory = (id: number, name: string) => {
            let list = items.filter(({ category }) => !category)

            if (id !== -1) list = items.filter(({ category }) => category?.id === id)

            return (
                <div key={id} className='mb-6'>
                    <div className='mb-2'>
                        <CategoryTag categoriesData={categoriesInList.filter(({ id }) => id !== -1)} categoryName={name} />
                        {id === -1 ? (
                            <p className='text-[13px] opacity-40 mt-1'>Go to the &quot;Items&quot; page to assign your items to categories</p>
                        ) : (
                            ''
                        )}
                    </div>
                    <ul>
                        {list.map((item, index) => (
                            <EditListItem key={index} item={item} listId={listIdSafe} setAnyChanges={setAnyChanges} />
                        ))}
                    </ul>
                </div>
            )
        }

        return (
            <>
                <h3 className='mb-2'>Items</h3>
                {categoriesInList.map(({ id, name }) => renderCategory(id, name))}
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

            <AddItem
                className='mb-2'
                onAdd={(itemToAdd, categoryId) => {
                    const payload: AddItemToListPayload = { listId: listIdSafe.toString(), itemName: itemToAdd }

                    if (categoryId) payload.categoryId = categoryId

                    addItemToList(payload)
                        .unwrap()
                        .then(() => {
                            setAnyChanges(true)
                        })
                }}
                itemsList={itemsData}
                isAddItemLoading={isAddItemLoading}
            />

            <div className='flex mb-4'>
                <Button to={`/lists/edit/${listId}/add-from-recipe`} className='text-sm h-7 px-3'>
                    Add From Recipe
                </Button>
                <Button to={`/lists/edit/${listId}/add-from-menu`} className='text-sm h-7 px-3 ml-2'>
                    Add From Menu
                </Button>
            </div>
            {renderCurrentItems()}
            <Outlet />
        </div>
    )
}

export default EditList
