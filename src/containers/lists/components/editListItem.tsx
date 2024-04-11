import { useRemoveItemFromListMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'
import { ListItem } from '../types'
import ItemWithQuantity from 'components/ItemWithQuantity'
import { useState } from 'react'

interface EditListItemProps {
    item: ListItem
    listId: number
}

function EditListItem({ item: { name, id, item_quantity }, listId }: EditListItemProps) {
    const [isBeingRemoved, setIsBeingRemoved] = useState(false)

    const { mutate: removeItemFromList } = useRemoveItemFromListMutation()

    function removeItem() {
        removeItemFromList({ listId: listId.toString(), itemId: id })
    }

    return (
        <li
            className={`flex justify-between w-full max-w-md mb-2 rounded-md relative top-0 left-0 h-6${
                isBeingRemoved ? ' top-24 left-52 opacity-0 h-0 transition-all duration-300 ease-linear' : ''
            }`}
        >
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

export default EditListItem
