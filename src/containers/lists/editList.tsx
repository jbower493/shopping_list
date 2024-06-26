import { useParams, Link, Outlet, useNavigate } from 'react-router-dom'
import { useAddItemToListMutation } from './queries'
import { useGetSingleListQuery } from './queries'
import { useGetItemsQuery } from 'containers/items/queries'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import EditListItem from 'containers/lists/components/editListItem'
import CategoryTag from 'components/CategoryTag'
import { getExistingCategories } from 'utils/functions'
import AddItem from 'containers/lists/components/addItem'
import type { AddItemToListPayload } from 'containers/lists/types'

function EditList() {
    const { listId } = useParams()
    const navigate = useNavigate()

    const { data: getSingleListData, isLoading: isGetSingleListLoading, isError: isGetSingleListError } = useGetSingleListQuery(listId || '')
    const { data: getItemsData, isLoading: isGetItemsLoading, isError: isGetItemsError } = useGetItemsQuery()
    const { mutate: addItemToList } = useAddItemToListMutation()

    if (isGetSingleListLoading || isGetItemsLoading) return <Loader fullPage />
    if (isGetSingleListError || !getSingleListData || isGetItemsError || !getItemsData) return <h1>List error</h1>

    const { name, id: listIdSafe, items } = getSingleListData

    const renderCurrentItems = () => {
        // Get a unique list of all the categories present in the list
        const categoriesInList = getExistingCategories(items)

        const renderCategory = (id: number, name: string) => {
            let list = items.filter(({ category }) => !category)

            if (id !== -1) list = items.filter(({ category }) => category?.id === id)

            list.sort((a, b) => (a.name > b.name ? 1 : -1))

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
                            <EditListItem key={index} item={item} listId={listIdSafe} />
                        ))}
                    </ul>
                </div>
            )
        }

        return (
            <div className='overflow-hidden pb-40'>
                <h3 className='mb-2'>Items</h3>
                {categoriesInList.map(({ id, name }) => renderCategory(id, name))}
            </div>
        )
    }

    return (
        <div className='p-4'>
            <div className='flex justify-between'>
                <Link to='/lists'>Back to lists</Link>
                <Link to={`/shop/${listIdSafe}`}>Shop</Link>
            </div>
            <div className='flex mb-7 mt-2'>
                <h2>{name}</h2>
                <button className='ml-4' type='button' onClick={() => navigate(`/lists/edit/${listIdSafe}/details`)}>
                    <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                </button>
            </div>

            <AddItem
                onAdd={(itemToAdd, categoryId, quantity, quantityUnitId) => {
                    const payload: AddItemToListPayload = { listId: listIdSafe.toString(), itemName: itemToAdd, quantity }

                    if (categoryId && categoryId !== 'none') payload.categoryId = categoryId
                    if (quantityUnitId) payload.quantityUnitId = quantityUnitId

                    addItemToList(payload)
                }}
                itemsList={getItemsData}
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
