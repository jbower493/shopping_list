import { singleRecipeQueryKey, useRemoveItemFromRecipeMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'
import { queryClient } from 'utils/queryClient'
import { RecipeItem } from '../types'
import ItemWithQuantity from 'components/ItemWithQuantity'
import { useState } from 'react'

interface EditRecipeItemProps {
    item: RecipeItem
    recipeId: number
}

function EditRecipeItem({ item: { name, id, item_quantity }, recipeId }: EditRecipeItemProps) {
    const [isBeingRemoved, setIsBeingRemoved] = useState(false)

    const { mutate: removeItemFromRecipe } = useRemoveItemFromRecipeMutation()

    function removeItem() {
        removeItemFromRecipe({ recipeId: recipeId.toString(), itemId: id })
    }

    return (
        <li className={`flex justify-between w-full max-w-md mb-2 rounded-md relative top-0 left-0 h-6${isBeingRemoved ? ' removing' : ''}`}>
            <ItemWithQuantity quantityValue={item_quantity.quantity} unitSymbol={item_quantity.quantity_unit?.symbol} itemName={name} />
            <button
                type='button'
                onClick={() => {
                    setIsBeingRemoved(true)
                    setTimeout(() => {
                        setIsBeingRemoved(false)
                        removeItem()
                    }, 300)
                }}
            >
                <TrashIcon className={`w-5 text-primary hover:text-primary-hover${isBeingRemoved ? ' hidden' : ''}`} />
            </button>
        </li>
    )
}

export default EditRecipeItem
