import { singleRecipeQueryKey, useRemoveItemFromRecipeMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'
import Loader from 'components/Loader'
import { queryClient } from 'utils/queryClient'
import { RecipeItem } from '../types'
import ItemWithQuantity from 'components/ItemWithQuantity'

interface EditRecipeItemProps {
    item: RecipeItem
    recipeId: number
}

function EditRecipeItem({ item: { name, id, item_quantity }, recipeId }: EditRecipeItemProps) {
    const { mutate: removeItemFromRecipe, isLoading: isRemoveItemFromRecipeLoading } = useRemoveItemFromRecipeMutation()

    return (
        <li className='flex justify-between w-full max-w-md mb-2'>
            <ItemWithQuantity quantityValue={item_quantity.quantity} unitSymbol={item_quantity.quantity_unit?.symbol} itemName={name} />
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
                                    queryClient.invalidateQueries(singleRecipeQueryKey(recipeId.toString()))
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
