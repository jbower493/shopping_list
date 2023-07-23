import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSingleRecipeKey, useAddItemToRecipeMutation } from './queries'
import { useGetSingleRecipeQuery } from './queries'
import { getItemsKey, useGetItemsQuery } from 'containers/items/queries'
import Loader from 'components/Loader'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/outline'
import EditRecipeItem from 'containers/recipes/components/editRecipeItem'
import AddItem from 'containers/lists/components/addItem'
import type { AddItemToRecipePayload } from 'containers/recipes/types'
import { queryClient } from 'utils/queryClient'

function EditRecipe() {
    const [anyChanges, setAnyChanges] = useState<boolean>(false)

    const { recipeId } = useParams()

    const {
        data: getSingleRecipeData,
        isFetching: isGetSingleRecipeFetching,
        isError: isGetSingleRecipeError
    } = useGetSingleRecipeQuery(recipeId || '')
    const { data: getItemsData, isFetching: isGetItemsFetching, isError: isGetItemsError } = useGetItemsQuery()

    const { mutate: addItemToRecipe, isLoading: isAddItemToRecipeLoading } = useAddItemToRecipeMutation()

    if (isGetSingleRecipeFetching || isGetItemsFetching) return <Loader fullPage />
    if (isGetSingleRecipeError || !getSingleRecipeData || isGetItemsError || !getItemsData) return <h1>Recipe error</h1>

    const { name, id, items } = getSingleRecipeData

    const renderCurrentItems = () => {
        return (
            <>
                <h3 className='mb-2'>Items</h3>
                <ul>
                    {items.map((item, index) => (
                        <EditRecipeItem key={index} item={item} recipeId={id} setAnyChanges={setAnyChanges} />
                    ))}
                </ul>
            </>
        )
    }

    return (
        <div className='p-4'>
            <Link to='/recipes'>Back to recipes</Link>
            <div className='flex justify-between mb-7 mt-2'>
                <h2>Edit Recipe</h2>
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
                className='mb-7'
                onAdd={(itemToAdd, categoryId) => {
                    const payload: AddItemToRecipePayload = { recipeId: id.toString(), itemName: itemToAdd }

                    if (categoryId && categoryId !== 'none') payload.categoryId = categoryId

                    addItemToRecipe(payload, {
                        onSuccess: () => {
                            setAnyChanges(true)
                            queryClient.invalidateQueries(getSingleRecipeKey)
                            queryClient.invalidateQueries(getItemsKey)
                        }
                    })
                }}
                itemsList={getItemsData}
                isAddItemLoading={isAddItemToRecipeLoading}
            />

            {renderCurrentItems()}
        </div>
    )
}

export default EditRecipe
