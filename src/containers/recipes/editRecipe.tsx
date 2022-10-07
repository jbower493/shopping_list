import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleRecipeQuery, useAddItemToRecipeMutation } from 'utils/api/recipes'
import { useGetItemsQuery } from 'utils/api/items'
import Loader from 'components/Loader'
import { PlusIcon } from '@heroicons/react/24/solid'
import EditRecipeItem from 'containers/recipes/components/editRecipeItem'

function EditRecipe() {
    const [itemToAdd, setItemToAdd] = useState<string>('')

    const { recipeId } = useParams()

    const { data: recipeData, isFetching: isGetRecipeFetching, isError: isGetRecipeError } = useGetSingleRecipeQuery(recipeId || '')
    const { data: itemsData, isFetching: isGetItemsFetching, isError: isGetItemsError } = useGetItemsQuery()

    const [addItemToRecipe, { isLoading: isAddItemLoading }] = useAddItemToRecipeMutation()

    if (isGetRecipeFetching || isGetItemsFetching) return <Loader fullPage />
    if (isGetRecipeError || !recipeData || isGetItemsError || !itemsData) return <h1>Recipe error</h1>

    const { name, id, items } = recipeData

    const renderCurrentItems = () => {
        return (
            <>
                <h3 className='mb-2'>Items</h3>
                <ul>
                    {items.map((item, index) => (
                        <EditRecipeItem key={index} item={item} recipeId={id} />
                    ))}
                </ul>
            </>
        )
    }

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Edit Recipe</h2>
            <p className='text-secondary-500 mb-8'>Name: {name}</p>
            {renderCurrentItems()}
            <label htmlFor='addItem' className='mt-8'>
                Add Item
            </label>
            <div className='flex items-center'>
                <select id='addItem' name='addItem' value={itemToAdd} onChange={(e) => setItemToAdd(e.target.value)} className='w-80 mb-0 mr-4'>
                    <option value='' disabled>
                        Select an item...
                    </option>
                    {itemsData.map(({ name, id }) => (
                        <option key={id} value={id.toString()}>
                            {name}
                        </option>
                    ))}
                </select>
                {isAddItemLoading ? (
                    <Loader size={'small'} />
                ) : (
                    <button onClick={() => addItemToRecipe({ recipeId: id.toString(), itemId: Number(itemToAdd) })}>
                        <PlusIcon className='w-8 text-primary hover:text-primary-hover' />
                    </button>
                )}
            </div>
        </div>
    )
}

export default EditRecipe
