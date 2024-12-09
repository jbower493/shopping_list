import { useRemoveItemFromListMutation } from '../queries'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { ListItem } from '../types'
import ItemWithQuantity from 'components/ItemWithQuantity'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface EditListItemProps {
    item: ListItem
    listId: number
}

function EditListItem({ item: { name, id, item_quantity }, listId }: EditListItemProps) {
    const navigate = useNavigate()

    const [isBeingRemoved, setIsBeingRemoved] = useState(false)

    const { mutate: removeItemFromList } = useRemoveItemFromListMutation()

    function removeItem() {
        removeItemFromList({ listId: listId.toString(), itemId: id })
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
                        navigate(`/lists/edit/${listId}/update-item-quantity/${id}`)
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

export default EditListItem
