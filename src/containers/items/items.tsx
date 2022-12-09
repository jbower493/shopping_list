import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetItemsQuery, useBulkAssignCategoryMutation } from 'utils/api/items'
import { useGetCategoriesQuery } from 'utils/api/categories'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { TrashIcon } from '@heroicons/react/24/solid'
import Checkbox from 'components/Checkbox'
import { getCategoryOptions } from 'utils/functions'
import { toast } from 'react-hot-toast'
import CategoryTag from 'components/CategoryTag'

function Items() {
    const [isAssigningCategories, setIsAssigningCategories] = useState(false)
    const [idsToAssign, setIdsToAssign] = useState<number[]>([])
    const [categoryToAssign, setCategoryToAssign] = useState<string>('none')

    const navigate = useNavigate()

    const { data: itemsData, isFetching: isItemsFetching, isError: isItemsError } = useGetItemsQuery()
    const { data: categoriesData, isFetching: isCategoriesFetching, isError: isCategoriesError } = useGetCategoriesQuery()

    const [confirmCategoryAssignment, { isLoading: isConfirmCategoryAssignmentLoading }] = useBulkAssignCategoryMutation()

    const toggleItemForAssignment = (idToToggle: number) => {
        if (idsToAssign.includes(idToToggle)) {
            return setIdsToAssign((prevIds) => prevIds.filter((id) => id !== idToToggle))
        }

        setIdsToAssign((prevIds) => [...prevIds, idToToggle])
    }

    const cancelCategoryAssignment = () => {
        setIsAssigningCategories(false)
        setIdsToAssign([])
    }

    if (isItemsFetching || isCategoriesFetching) return <Loader fullPage />
    if (isItemsError || !itemsData || !categoriesData || isCategoriesError) return <h1>Items error</h1>

    return (
        <div className='p-4'>
            <h2>Items</h2>
            <div className='flex mt-4'>
                <Button onClick={() => navigate('/items/new')}>Add New</Button>
                {isAssigningCategories ? (
                    ''
                ) : (
                    <Button className='ml-2' onClick={() => setIsAssigningCategories(true)}>
                        Assign Categories
                    </Button>
                )}
            </div>
            {isAssigningCategories ? (
                <p className='mt-2'>
                    Select all the items you wish to change the category of, then at the bottom of the page, choose a category and confirm.
                </p>
            ) : (
                ''
            )}
            <div className='mt-8'>
                {itemsData.map(({ name, id, category }) => (
                    <div key={id} className='flex justify-between w-full max-w-md mb-2'>
                        <div className='flex items-center flex-wrap'>
                            {isAssigningCategories ? (
                                <Checkbox className='mr-2' isChecked={idsToAssign.includes(id)} onClick={() => toggleItemForAssignment(id)} />
                            ) : (
                                ''
                            )}
                            {name}
                            <CategoryTag
                                key={id}
                                className='ml-2'
                                categoriesData={categoriesData}
                                categoryName={category?.name || 'Uncategorized'}
                                size='sm'
                            />
                        </div>
                        <div>
                            <button type='button' onClick={() => navigate(`/items/delete/${id}`)}>
                                <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {isAssigningCategories ? (
                <div className='mt-6'>
                    <select className='w-60' value={categoryToAssign} onChange={(e) => setCategoryToAssign(e.target.value)}>
                        {getCategoryOptions(categoriesData).map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <div className='flex'>
                        <Button
                            disabled={idsToAssign.length <= 0 || isConfirmCategoryAssignmentLoading}
                            loading={isConfirmCategoryAssignmentLoading}
                            onClick={() =>
                                confirmCategoryAssignment({
                                    category_id: categoryToAssign === 'none' ? -1 : Number(categoryToAssign),
                                    item_ids: idsToAssign
                                })
                                    .unwrap()
                                    .then((result) => {
                                        toast.success(result.message)
                                        cancelCategoryAssignment()
                                    })
                            }
                        >
                            Confirm Category
                        </Button>
                        <Button className='ml-2' color='secondary' onClick={cancelCategoryAssignment}>
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                ''
            )}
            <Outlet />
        </div>
    )
}

export default Items
