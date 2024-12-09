import { useRemoveItemFromRecipeMutation } from '../queries'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { RecipeItem } from '../types'
import ItemWithQuantity from 'components/ItemWithQuantity'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface EditRecipeItemProps {
    item: RecipeItem
    recipeId: number
}

function EditRecipeItem({ item: { name, id, item_quantity }, recipeId }: EditRecipeItemProps) {
    const navigate = useNavigate()

    const [isBeingRemoved, setIsBeingRemoved] = useState(false)

    const { mutate: removeItemFromRecipe } = useRemoveItemFromRecipeMutation()

    function removeItem() {
        removeItemFromRecipe({ recipeId: recipeId.toString(), itemId: id })
    }

    return (
        <li
            className={`flex justify-between items-center w-full max-w-md rounded-md relative top-0 left-0 h-8${
                isBeingRemoved ? ' top-24 left-52 opacity-0 h-0 transition-all duration-200 ease-linear' : ''
            }`}
        >
            <ItemWithQuantity quantityValue={item_quantity.quantity} unitSymbol={item_quantity.quantity_unit?.symbol} itemName={name} />
            <div className='flex items-center gap-4'>
                <button
                    type='button'
                    onClick={() => {
                        navigate(`/recipes/edit/${recipeId}/update-item-quantity/${id}`)
                    }}
                >
                    <PencilSquareIcon className={`w-5 text-primary hover:text-primary-hover${isBeingRemoved ? ' hidden' : ''}`} />
                </button>
                <button
                    type='button'
                    onClick={() => {
                        setIsBeingRemoved(true)
                        setTimeout(() => {
                            setIsBeingRemoved(false)
                            removeItem()
                        }, 200)
                    }}
                >
                    <TrashIcon className={`w-5 text-primary hover:text-primary-hover${isBeingRemoved ? ' hidden' : ''}`} />
                </button>
            </div>
        </li>
    )
}

export default EditRecipeItem
