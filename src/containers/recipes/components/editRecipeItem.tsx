import React from 'react'
import { getSingleRecipeKey, useRemoveItemFromRecipeMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'
import Loader from 'components/Loader'
import { queryClient } from 'utils/queryClient'

interface EditRecipeItemProps {
    item: {
        name: string
        id: number
    }
    recipeId: number
    setAnyChanges: (anyChanges: boolean) => void
}

function EditRecipeItem({ item: { name, id }, recipeId, setAnyChanges }: EditRecipeItemProps) {
    const { mutate: removeItemFromRecipe, isLoading: isRemoveItemFromRecipeLoading } = useRemoveItemFromRecipeMutation()

    return (
        <li className='flex justify-between w-full max-w-md mb-2'>
            {name}
            {isRemoveItemFromRecipeLoading ? (
                <Loader size='small' />
            ) : (
                <button
                    type='button'
                    onClick={() => {
                        removeItemFromRecipe(
                            { recipeId: recipeId.toString(), itemId: id },
                            {
                                onSuccess: () => {
                                    setAnyChanges(true)
                                    queryClient.invalidateQueries(getSingleRecipeKey)
                                }
                            }
                        )
                    }}
                >
                    <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                </button>
            )}
        </li>
    )
}

export default EditRecipeItem
