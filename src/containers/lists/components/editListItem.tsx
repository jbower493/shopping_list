import { useRemoveItemFromListMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'
import { ListItem } from '../types'
import ItemWithQuantity from 'components/ItemWithQuantity'

interface EditListItemProps {
    item: ListItem
    listId: number
}

function EditListItem({ item: { name, id, item_quantity }, listId }: EditListItemProps) {
    const { mutate: removeItemFromList } = useRemoveItemFromListMutation()

    return (
        <li className='flex justify-between w-full max-w-md mb-2'>
            <ItemWithQuantity quantityValue={item_quantity.quantity} unitSymbol={item_quantity.quantity_unit?.symbol} itemName={name} />
            <button
                type='button'
                onClick={() => {
                    removeItemFromList({ listId: listId.toString(), itemId: id })
                }}
            >
                <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
            </button>
        </li>
    )
}

export default EditListItem
