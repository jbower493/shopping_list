import React from 'react'
import { useRemoveItemFromRecipeMutation } from 'utils/api/recipes'
import { TrashIcon } from '@heroicons/react/24/solid'
import Loader from 'components/Loader'

interface EditRecipeItemProps {
    item: {
        name: string
        id: number
    }
    recipeId: number
}

function EditRecipeItem({ item: { name, id }, recipeId }: EditRecipeItemProps) {
    const [removeItemFromRecipe, { isLoading }] = useRemoveItemFromRecipeMutation()

    return (
        <li className='flex justify-between w-full max-w-md mb-2'>
            {name}
            {isLoading ? (
                <Loader size='small' />
            ) : (
                <button type='button' onClick={() => removeItemFromRecipe({ recipeId: recipeId.toString(), itemId: id })}>
                    <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                </button>
            )}
        </li>
    )
}

export default EditRecipeItem
