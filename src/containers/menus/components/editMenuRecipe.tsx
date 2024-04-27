import { useContext, useState } from 'react'
import { singleMenuQueryKey, useRemoveRecipeFromMenuMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'
import Loader from 'components/Loader'
import { queryClient } from 'utils/queryClient'
import { Recipe } from 'containers/recipes/types'
import { EditMenuIsDraggingContext } from '../editMenu'
import classnames from 'classnames'

interface EditMenuRecipeProps {
    recipe: Recipe
    menuId: number
}

function EditMenuRecipe({ recipe: { name, id }, menuId }: EditMenuRecipeProps) {
    const { setIsDragging } = useContext(EditMenuIsDraggingContext)

    const [isClicked, setIsClicked] = useState(false)

    const { mutate: removeRecipeFromMenu, isLoading: isRemoveRecipeFromMenuLoading } = useRemoveRecipeFromMenuMutation()

    return (
        <div className='flex justify-between w-full max-w-md mt-1'>
            <button
                className={classnames('transition-transform', { 'scale-[1.2]': isClicked })}
                type='button'
                draggable
                onDragStart={(e) => {
                    setIsDragging(true)

                    const data = JSON.stringify({ recipeId: id })
                    e.dataTransfer.setData('application/my-app', data)
                    e.dataTransfer.dropEffect = 'move'
                }}
                onDragEnd={() => {
                    setIsClicked(false)
                    setIsDragging(false)
                }}
                onMouseDown={() => setIsClicked(true)}
                onTouchStart={() => setIsClicked(true)}
                onMouseUp={() => setIsClicked(false)}
                onTouchEnd={() => setIsClicked(false)}
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
