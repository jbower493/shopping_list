import React from 'react'
import { useParams } from 'react-router-dom'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { useGetSingleListQuery } from 'containers/lists/queries'
import Loader from 'components/Loader'
import { useSessionStorage } from 'utils/hooks'
import Checkbox from 'components/Checkbox'
import { getExistingCategories } from 'utils/functions'
import CategoryTag from 'components/CategoryTag'

function Shop() {
    const { listId } = useParams()

    const { value: checked, setValue: setChecked } = useSessionStorage<string[]>(`list${listId?.toString() || ''}`, [])

    const { data: getSingleListData, isFetching: isGetSingleListFetching, isError: isGetSingleListError } = useGetSingleListQuery(listId || '')

    const checkItem = (name: string) => setChecked(checked ? [...checked, name] : [name])
    const uncheckItem = (name: string) => setChecked((prevChecked) => (prevChecked ? prevChecked.filter((item) => item !== name) : []))

    if (isGetSingleListFetching) return <Loader fullPage />
    if (isGetSingleListError || !getSingleListData) return <h1>List error</h1>

    const { name, items } = getSingleListData

    // Get a unique list of all the categories present in the list
    const categoriesInList = getExistingCategories(items)

    const renderItems = () => {
        const renderOneItem = (name: string, index: number) => {
            const isChecked = !!checked?.includes(name)

            return (
                <button
                    key={index}
                    onClick={() => {
                        if (isChecked) uncheckItem(name)
                        else checkItem(name)
                    }}
                    className='flex justify-between w-full max-w-md mb-2'
                >
                    <p className={`${isChecked ? 'line-through opacity-30' : ''}`}>{name}</p>
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
                    <ul className='mb-6'>{list.map(({ name }, index) => renderOneItem(name, index))}</ul>
                </>
            )
        }

        return categoriesInList.map(({ id, name }) => renderCategory(id, name))
    }

    return (
        <div className='p-4'>
            <div className='flex justify-between mb-7'>
                <h2>Shop</h2>
                <div className='flex items-center'>
                    <ClipboardDocumentListIcon className='mr-2 w-7 text-primary' />
                    <p>{name}</p>
                </div>
            </div>
            {renderItems()}
        </div>
    )
}

export default Shop
