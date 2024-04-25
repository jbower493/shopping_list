import React, { useContext } from 'react'
import { singleMenuQueryKey, useRemoveRecipeFromMenuMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'
import Loader from 'components/Loader'
import { queryClient } from 'utils/queryClient'
import { Recipe } from 'containers/recipes/types'
import { EditMenuIsDraggingContext } from '../editMenu'

interface EditMenuRecipeProps {
    recipe: Recipe
    menuId: number
}

function EditMenuRecipe({ recipe: { name, id }, menuId }: EditMenuRecipeProps) {
    const { setIsDragging } = useContext(EditMenuIsDraggingContext)

    const { mutate: removeRecipeFromMenu, isLoading: isRemoveRecipeFromMenuLoading } = useRemoveRecipeFromMenuMutation()

    return (
        <div className='flex justify-between w-full max-w-md mb-1'>
            <button
                type='button'
                draggable
                onDragStart={(e) => {
                    setIsDragging(true)

                    const data = JSON.stringify({ recipeId: id })
                    e.dataTransfer.setData('application/my-app', data)
                    e.dataTransfer.dropEffect = 'move'

                    // const img = new Image()
                    // img.src = 'https://img.freepik.com/free-photo/abstract-autumn%E2%80%A6-generated-by-ai_188544-9871.jpg?size=626&ext=jpg'
                    // e.dataTransfer.setDragImage(img, 20, 20)
                }}
                onDragEnd={(e) => {
                    setIsDragging(false)
                }}
            >
                {name}
            </button>
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
        </div>
    )
}

export default EditMenuRecipe
