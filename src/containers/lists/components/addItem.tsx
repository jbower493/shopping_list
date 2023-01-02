import React, { useState } from 'react'
import Loader from 'components/Loader'
import { PlusIcon } from '@heroicons/react/24/solid'
import ComboBox from 'components/Form/Inputs/Combobox'
import { Item } from 'containers/items/types'

interface AddItemProps {
    onAdd: (itemToAdd: string) => void
    itemsList: Item[]
    isAddItemLoading: boolean
    className?: string
}

function AddItem({ onAdd, itemsList, isAddItemLoading, className }: AddItemProps) {
    const [itemToAdd, setItemToAdd] = useState<string>('')

    return (
        <div className={className}>
            <p>Add Item</p>
            <div className='flex items-center'>
                <ComboBox value={itemToAdd} setValue={setItemToAdd} options={itemsList.map(({ name }) => name)} />
                {isAddItemLoading ? (
                    <Loader size={'small'} />
                ) : (
                    <button
                        onClick={() => {
                            onAdd(itemToAdd)
                            setItemToAdd('')
                        }}
                    >
                        <PlusIcon className='w-8 text-primary hover:text-primary-hover' />
                    </button>
                )}
            </div>
        </div>
    )
}

export default AddItem
