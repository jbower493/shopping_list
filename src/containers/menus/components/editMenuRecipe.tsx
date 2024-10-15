import { useContext, useState } from 'react'
import { singleMenuQueryKey, useRemoveRecipeFromMenuMutation } from '../queries'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { queryClient } from 'utils/queryClient'
import { Recipe } from 'containers/recipes/types'
import { EditMenuIsDraggingContext } from '../editMenu'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'

interface EditMenuRecipeProps {
    recipe: Recipe
    menuId: number
}

function EditMenuRecipe({ recipe: { name, id }, menuId }: EditMenuRecipeProps) {
    const { setIsDragging } = useContext(EditMenuIsDraggingContext)
    const navigate = useNavigate()

    const [isClicked, setIsClicked] = useState(false)

    const { mutate: removeRecipeFromMenu } = useRemoveRecipeFromMenuMutation()

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
            <div>
                <button className='mr-4' type='button' onClick={() => navigate(`/recipes/edit/${id}`)}>
                    <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                </button>
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
            </div>
        </div>
    )
}

export default EditMenuRecipe
