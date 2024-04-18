import React from 'react'
import { singleMenuQueryKey, useRemoveRecipeFromMenuMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'
import Loader from 'components/Loader'
import { queryClient } from 'utils/queryClient'
import { Recipe } from 'containers/recipes/types'

interface EditMenuRecipeProps {
    recipe: Recipe
    menuId: number
}

function EditMenuRecipe({ recipe: { name, id }, menuId }: EditMenuRecipeProps) {
    const { mutate: removeRecipeFromMenu, isLoading: isRemoveRecipeFromMenuLoading } = useRemoveRecipeFromMenuMutation()

    return (
        <li className='flex justify-between w-full max-w-md mb-2'>
            {name}
            {isRemoveRecipeFromMenuLoading ? (
                <Loader size='small' />
            ) : (
                <button
                    type='button'
                    onClick={() => {
                        removeRecipeFromMenu(
                            { menuId: menuId.toString(), recipeId: id },
                            {
                                onSuccess: () => {
                                    queryClient.invalidateQueries(singleMenuQueryKey(menuId.toString()))
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

export default EditMenuRecipe
