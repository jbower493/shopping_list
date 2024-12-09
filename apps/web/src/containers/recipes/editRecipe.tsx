import { useState } from 'react'
import { useParams, Link, useNavigate, Outlet } from 'react-router-dom'
import { useAddItemToRecipeMutation } from './queries'
import { useGetSingleRecipeQuery } from './queries'
import { useGetItemsQuery } from 'containers/items/queries'
import Loader from 'components/Loader'
import { ArrowUpTrayIcon, Square2StackIcon, PencilSquareIcon, EllipsisHorizontalIcon, TrashIcon } from '@heroicons/react/24/solid'
import EditRecipeItem from 'containers/recipes/components/editRecipeItem'
import AddItem from 'containers/lists/components/addItem'
import type { AddItemToRecipePayload } from 'containers/recipes/types'
import CategoryTag from 'components/CategoryTag'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'
import { Dropdown } from 'components/Dropdown'
import { ClockIcon, CloudArrowUpIcon, UsersIcon } from '@heroicons/react/24/outline'

function formatPrepTime(time: number | null) {
    if (!time || !Number.isInteger(time)) {
        return '?'
    }

    if (time < 60) {
        return `${time} mins`
    }

    const mins = time % 60
    const hrs = (time - mins) / 60

    return `${hrs} ${hrs === 1 ? 'hr' : 'hrs'} ${mins} mins`
}

function EditRecipe() {
    const [isInstructionsShowing, setIsInstructionsShowing] = useState<boolean>(true)

    const { recipeId } = useParams()
    const navigate = useNavigate()

    const { data: getRecipeCategoriesData } = useGetRecipeCategoriesQuery()

    const {
        data: getSingleRecipeData,
        isLoading: isGetSingleRecipeLoading,
        isError: isGetSingleRecipeError
    } = useGetSingleRecipeQuery(recipeId || '')
    const { data: getItemsData, isLoading: isGetItemsLoading, isError: isGetItemsError } = useGetItemsQuery()

    const { mutate: addItemToRecipe } = useAddItemToRecipeMutation()

    if (isGetSingleRecipeLoading || isGetItemsLoading) return <Loader fullPage />
    if (isGetSingleRecipeError || !getSingleRecipeData || isGetItemsError || !getItemsData) return <h1>Recipe error</h1>

    const { name, id, items, instructions, recipe_category, image_url, prep_time, serves } = getSingleRecipeData

    const renderInstructions = () => {
        if (!isInstructionsShowing) {
            return ''
        }

        return (
            <pre className='text-secondary-500 whitespace-pre-wrap' style={{ fontFamily: 'inherit' }}>
                {instructions || 'None set. Click the edit icon above to add some instructions.'}
            </pre>
        )
    }

    const renderCurrentItems = () => {
        return (
            <>
                <h3>Items</h3>
                <ul className='mt-2 overflow-hidden pb-40'>
                    {[...items]
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((item, index) => (
                            <EditRecipeItem key={index} item={item} recipeId={id} />
                        ))}
                </ul>
            </>
        )
    }

    return (
        <div className='p-4'>
            <div className='flex justify-between'>
                <Link to='/recipes'>Back to recipes</Link>
                <Dropdown
                    dropdownClassName='h-8 w-8'
                    menuButtonClassName='!bg-primary !text-white w-full h-full flex justify-center items-center rounded-full'
                    menuButton={<EllipsisHorizontalIcon className='size-6' style={{ transform: 'scale(400%)' }} />}
                    menuItems={[
                        <Dropdown.MenuItem.Button key='1' onClick={() => navigate(`/recipes/edit/${id}/duplicate`)}>
                            <Square2StackIcon className='w-4 text-primary' />
                            Duplicate
                        </Dropdown.MenuItem.Button>,
                        <Dropdown.MenuItem.Button key='2' onClick={() => navigate(`/recipes/edit/${id}/share`)}>
                            <ArrowUpTrayIcon className='w-4 text-primary' />
                            Share
                        </Dropdown.MenuItem.Button>
                    ]}
                />
            </div>
            <div className='mt-2'>
                <div className='flex items-center'>
                    <h2>{name}</h2>
                    <button className='ml-4' type='button' onClick={() => navigate(`/recipes/edit/${id}/details`)}>
                        <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                    </button>
                </div>
                <div className='flex gap-4 items-center mt-3'>
                    <CategoryTag
                        key={id}
                        categoriesData={getRecipeCategoriesData || []}
                        categoryName={recipe_category?.name || 'Uncategorized'}
                        size='sm'
                    />
                    <div className='flex gap-1 items-center'>
                        <ClockIcon className='w-5 text-primary' />
                        <p className='text-secondary-500 text-sm'>{formatPrepTime(prep_time)}</p>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <UsersIcon className='w-5 text-primary' />
                        <p className='text-secondary-500 text-sm'>{serves || '?'}</p>
                    </div>
                </div>
            </div>
            {image_url ? (
                <div className='relative mt-4 h-44 max-w-[450px]'>
                    <img className='h-full w-full object-cover rounded-md' src={image_url || ''} alt={name} />
                    <Dropdown
                        dropdownClassName='!absolute top-3 right-3 h-8 w-8'
                        menuButtonClassName='bg-white w-full h-full flex justify-center items-center rounded-full'
                        menuButton={<EllipsisHorizontalIcon className='size-6' style={{ transform: 'scale(400%)' }} />}
                        menuItems={[
                            <Dropdown.MenuItem.Link key='1' to={`/recipes/edit/${id}/upload-image`}>
                                <CloudArrowUpIcon className='size-4 text-primary' />
                                Upload new
                            </Dropdown.MenuItem.Link>,
                            <Dropdown.MenuItem.Link key='2' to={`/recipes/edit/${id}/remove-image`}>
                                <TrashIcon className='size-4 text-primary' />
                                Remove
                            </Dropdown.MenuItem.Link>
                        ]}
                    />
                </div>
            ) : (
                <div className='mt-2'>
                    <Link to={`/recipes/edit/${id}/upload-image`}>Upload Image</Link>
                </div>
            )}

            <div className='mt-4'>
                <div className='flex items-center mb-2'>
                    <h3>Instructions</h3>
                    <button
                        type='button'
                        onClick={() => setIsInstructionsShowing((prev) => !prev)}
                        className='ml-4 text-sky-500 hover:text-sky-600 hover:underline'
                    >
                        {isInstructionsShowing ? 'Hide' : 'Show'}
                    </button>
                    <button className='ml-4' type='button' onClick={() => navigate(`/recipes/edit/${id}/details`)}>
                        <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                    </button>
                </div>
                {renderInstructions()}
            </div>
            <AddItem
                className='mt-6'
                onAdd={(itemToAdd, categoryId, quantity, quantityUnitId) => {
                    const payload: AddItemToRecipePayload = { recipeId: id.toString(), itemName: itemToAdd, quantity }

                    if (categoryId && categoryId !== 'none') payload.categoryId = categoryId
                    if (quantityUnitId) payload.quantityUnitId = quantityUnitId

                    addItemToRecipe(payload)
                }}
                itemsList={getItemsData}
            />
            <div className='mt-4'>{renderCurrentItems()}</div>
            <Outlet />
        </div>
    )
}

export default EditRecipe
