import React, { useState } from 'react'
import Loader from 'components/Loader'
import { PlusIcon } from '@heroicons/react/24/solid'
import ComboBox from 'components/Form/Inputs/Combobox'
import { Item } from 'containers/items/types'
import NewItemCategoryForm from 'containers/lists/components/newItemCategoryForm'
import SelectField from 'components/Form/Inputs/SelectField'

interface AddItemProps {
    onAdd: (itemToAdd: string, categoryId: string | null, quantity: number, quantityUnitId: number | null, clearInput: () => void) => void
    itemsList: Item[]
    isAddItemLoading: boolean
    className?: string
}

function AddItem({ onAdd, itemsList, isAddItemLoading, className }: AddItemProps) {
    const [itemToAdd, setItemToAdd] = useState<string>('')
    const [quantityUnitToAdd, setQuantityUnitToAdd] = useState('100')

    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

    const isNewItem = !itemsList.find(({ name }) => name === itemToAdd)

    const addItem = (categoryId: string | null = null) => {
        // TODO: send actual quantity data
        onAdd(itemToAdd, categoryId, 1, null, () => setItemToAdd(''))
    }

    return (
        <div className={className}>
            <h4>Add Item</h4>
            <div className='flex items-center gap-3'>
                <SelectField
                    label='mate'
                    name='mate'
                    onChange={(e) => setQuantityUnitToAdd(e.target.value)}
                    value={quantityUnitToAdd}
                    options={[
                        {
                            label: 'ml',
                            value: 'ml'
                        },
                        { label: 'g', value: 'g' }
                    ]}
                />
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
