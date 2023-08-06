import React, { useState } from 'react'
import Loader from 'components/Loader'
import { PlusIcon } from '@heroicons/react/24/solid'
import ComboBox from 'components/Form/Inputs/Combobox'
import { Item } from 'containers/items/types'
import NewItemCategoryForm from 'containers/lists/components/newItemCategoryForm'

interface AddItemProps {
    onAdd: (itemToAdd: string, categoryId: string | null, clearInput: () => void) => void
    itemsList: Item[]
    isAddItemLoading: boolean
    className?: string
}

function AddItem({ onAdd, itemsList, isAddItemLoading, className }: AddItemProps) {
    const [itemToAdd, setItemToAdd] = useState<string>('')
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

    const isNewItem = !itemsList.find(({ name }) => name === itemToAdd)

    const addItem = (categoryId: string | null = null) => {
        onAdd(itemToAdd, categoryId, () => setItemToAdd(''))
    }

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
                            if (isNewItem) {
                                setIsCategoryModalOpen(true)
                            } else {
                                addItem()
                            }
                        }}
                    >
                        <PlusIcon className='w-8 text-primary hover:text-primary-hover' />
                    </button>
                )}
            </div>
            <NewItemCategoryForm
                isOpen={isCategoryModalOpen}
                close={() => setIsCategoryModalOpen(false)}
                onSubmitFunc={(categoryId) => {
                    setIsCategoryModalOpen(false)
                    addItem(categoryId)
                }}
                itemName={itemToAdd}
            />
        </div>
    )
}

export default AddItem
