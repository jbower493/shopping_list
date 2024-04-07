import { Outlet, useNavigate } from 'react-router-dom'
import { useGetItemsQuery } from './queries'
import { useGetCategoriesQuery } from 'containers/categories/queries'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import CategoryTag from 'components/CategoryTag'

// TODO: when implementing change category for single item, make sure to invalidate all items, lists and recipes queries

function Items() {
    const navigate = useNavigate()

    const { data: getItemsData, isFetching: isGetItemsFetching, isError: isGetItemsError } = useGetItemsQuery()
    const { data: getCategoriesData, isFetching: isGetCategoriesFetching, isError: isGetCategoriesError } = useGetCategoriesQuery()

    if (isGetItemsFetching || isGetCategoriesFetching) return <Loader fullPage />
    if (isGetItemsError || !getItemsData || !getCategoriesData || isGetCategoriesError) return <h1>Items error</h1>

    return (
        <div className='p-4'>
            <h2>Items</h2>
            <div className='flex mt-4'>
                <Button onClick={() => navigate('/items/new')}>Add New</Button>
            </div>
            <div className='mt-8'>
                {getItemsData.map(({ name, id, category }) => (
                    <div key={id} className='flex justify-between w-full max-w-md mb-2'>
                        <div className='flex items-center flex-wrap'>
                            {name}
                            <CategoryTag
                                key={id}
                                className='ml-2'
                                categoriesData={getCategoriesData}
                                categoryName={category?.name || 'Uncategorized'}
                                size='sm'
                            />
                        </div>
                        <div>
                            <button className='mr-4' type='button' onClick={() => navigate(`/items/edit/${id}`)}>
                                <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                            </button>
                            <button type='button' onClick={() => navigate(`/items/delete/${id}`)}>
                                <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Outlet />
        </div>
    )
}

export default Items
