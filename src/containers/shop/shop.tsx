import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { useGetSingleListQuery } from 'containers/lists/queries'
import Loader from 'components/Loader'
import { useLocalStorage } from 'utils/hooks'
import Checkbox from 'components/Checkbox'
import { getExistingCategories } from 'utils/functions'
import CategoryTag from 'components/CategoryTag'
import ItemWithQuantity from 'components/ItemWithQuantity'
import { ListItem } from 'containers/lists/types'

function Shop() {
    const { listId } = useParams()

    const { value: checked, setValue: setChecked } = useLocalStorage<string[]>(`list${listId?.toString() || ''}`, [])

    const { data: getSingleListData, isFetching: isGetSingleListFetching, isError: isGetSingleListError } = useGetSingleListQuery(listId || '')

    const checkItem = (name: string) => setChecked(checked ? [...checked, name] : [name])
    const uncheckItem = (name: string) => setChecked((prevChecked) => (prevChecked ? prevChecked.filter((item) => item !== name) : []))

    if (isGetSingleListFetching) return <Loader fullPage />
    if (isGetSingleListError || !getSingleListData) return <h1>List error</h1>

    const { name, items } = getSingleListData

    // Get a unique list of all the categories present in the list
    const categoriesInList = getExistingCategories(items)

    const renderItems = () => {
        const renderOneItem = (itemWithinCategory: ListItem) => {
            const isChecked = !!checked?.includes(itemWithinCategory.name)

            return (
                <button
                    key={itemWithinCategory.id}
                    onClick={() => {
                        if (isChecked) uncheckItem(itemWithinCategory.name)
                        else checkItem(itemWithinCategory.name)
                    }}
                    className='flex justify-between w-full max-w-md mb-2'
                >
                    <div
                        className={`${
                            isChecked
                                ? 'relative opacity-30 after:content-[""] after:w-full after:h-[1px] after:bg-black after:absolute after:top-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2'
                                : ''
                        }`}
                    >
                        <ItemWithQuantity
                            quantityValue={itemWithinCategory.item_quantity.quantity}
                            unitSymbol={itemWithinCategory.item_quantity.quantity_unit?.symbol}
                            itemName={itemWithinCategory.name}
                        />
                    </div>
                    <Checkbox isChecked={isChecked} />
                </button>
            )
        }

        const renderCategory = (id: number, name: string) => {
            let list = items.filter(({ category }) => !category)

            if (id !== -1) list = items.filter(({ category }) => category?.id === id)

            list.sort((a, b) => (a.name > b.name ? 1 : -1))

            return (
                <>
                    <CategoryTag key={id} className='mb-2' categoriesData={categoriesInList.filter(({ id }) => id !== -1)} categoryName={name} />
                    <ul className='mb-6'>{list.map((itemWithinCategory) => renderOneItem(itemWithinCategory))}</ul>
                </>
            )
        }

        return categoriesInList.map(({ id, name }) => renderCategory(id, name))
    }

    return (
        <div className='p-4'>
            <div className='flex justify-between'>
                <Link to='/lists'>Back to lists</Link>
                <div className='flex items-center'>
                    <ClipboardDocumentListIcon className='mr-2 w-7 text-primary' />
                    <Link to={`/lists/edit/${listId}`} className='text-black hover:text-black'>
                        {name}
                    </Link>
                </div>
            </div>
            <div className='flex justify-between mb-7 mt-2'>
                <h2>Shop</h2>
            </div>
            {renderItems()}
        </div>
    )
}

export default Shop
