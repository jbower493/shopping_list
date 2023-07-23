import React from 'react'
import { getSingleMenuKey, useRemoveRecipeFromMenuMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'
import Loader from 'components/Loader'
import { queryClient } from 'utils/queryClient'

interface EditMenuRecipeProps {
    recipe: {
        name: string
        id: number
    }
    menuId: number
    setAnyChanges: (anyChanges: boolean) => void
}

function EditMenuRecipe({ recipe: { name, id }, menuId, setAnyChanges }: EditMenuRecipeProps) {
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
                                    setAnyChanges(true)
                                    queryClient.invalidateQueries(getSingleMenuKey)
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
