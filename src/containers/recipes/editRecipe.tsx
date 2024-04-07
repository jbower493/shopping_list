import { useState } from 'react'
import { useParams, Link, useNavigate, Outlet } from 'react-router-dom'
import { useAddItemToRecipeMutation } from './queries'
import { useGetSingleRecipeQuery } from './queries'
import { useGetItemsQuery } from 'containers/items/queries'
import Loader from 'components/Loader'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import EditRecipeItem from 'containers/recipes/components/editRecipeItem'
import AddItem from 'containers/lists/components/addItem'
import type { AddItemToRecipePayload } from 'containers/recipes/types'
import CategoryTag from 'components/CategoryTag'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'

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

    const { name, id, items, instructions, recipe_category } = getSingleRecipeData

    const renderInstructions = () => {
        if (!isInstructionsShowing) {
            return ''
        }

        if (!instructions) {
            return <p>None set. Click the &quot;Edit&quot; icon above to add some instructions.</p>
        }

        const lines = instructions.split('\n')

        return (
            <div>
                {lines.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        )
    }

    const renderCurrentItems = () => {
        return (
            <>
                <h3 className='mb-2'>Items</h3>
                <ul>
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
            <Link to='/recipes'>Back to recipes</Link>
            <div className='mb-7 mt-2'>
                <div className='flex items-center'>
                    <h2>{name}</h2>
                    <button className='ml-4' type='button' onClick={() => navigate(`/recipes/edit/${id}/details`)}>
                        <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                    </button>
                </div>
                <div className='ml-[-0.5rem] mt-1'>
                    <CategoryTag
                        key={id}
                        className='ml-2'
                        categoriesData={getRecipeCategoriesData || []}
                        categoryName={recipe_category?.name || 'Uncategorized'}
                        size='sm'
                    />
                </div>
            </div>

            <div className='mb-8'>
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
                className='mb-6'
                onAdd={(itemToAdd, categoryId, quantity, quantityUnitId, clearInput) => {
                    const payload: AddItemToRecipePayload = { recipeId: id.toString(), itemName: itemToAdd, quantity }

                    if (categoryId && categoryId !== 'none') payload.categoryId = categoryId
                    if (quantityUnitId) payload.quantityUnitId = quantityUnitId

                    addItemToRecipe(payload)

                    clearInput()
                }}
                itemsList={getItemsData}
            />

            {renderCurrentItems()}

            <Outlet />
        </div>
    )
}

export default EditRecipe
