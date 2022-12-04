import React from 'react'
import { useRemoveRecipeFromMenuMutation } from 'utils/api/menus'
import { TrashIcon } from '@heroicons/react/24/solid'
import Loader from 'components/Loader'

interface EditMenuRecipeProps {
    recipe: {
        name: string
        id: number
    }
    menuId: number
    setAnyChanges: (anyChanges: boolean) => void
}

function EditMenuRecipe({ recipe: { name, id }, menuId, setAnyChanges }: EditMenuRecipeProps) {
    const [removeRecipeFromMenu, { isLoading }] = useRemoveRecipeFromMenuMutation()

    return (
        <li className='flex justify-between w-full max-w-md mb-2'>
            {name}
            {isLoading ? (
                <Loader size='small' />
            ) : (
                <button
                    type='button'
                    onClick={() => {
                        removeRecipeFromMenu({ menuId: menuId.toString(), recipeId: id })
                            .unwrap()
                            .then(() => setAnyChanges(true))
                    }}
                >
                    <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                </button>
            )}
        </li>
    )
}

export default EditMenuRecipe
