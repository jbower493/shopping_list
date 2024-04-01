import React, { useEffect, useState } from 'react'
import Loader from 'components/Loader'
import { PlusIcon } from '@heroicons/react/24/solid'
import ComboBox from 'components/Form/Inputs/Combobox'
import { Item } from 'containers/items/types'
import NewItemCategoryForm from 'containers/lists/components/newItemCategoryForm'
import SelectField from 'components/Form/Inputs/SelectField'
import InputField from 'components/Form/Inputs/InputField/component'
import { useQuantityUnitsQuery } from 'containers/quantityUnits/queries'

interface AddItemProps {
    onAdd: (itemToAdd: string, categoryId: string | null, quantity: number, quantityUnitId: number | null, clearInput: () => void) => void
    itemsList: Item[]
    isAddItemLoading: boolean
    className?: string
}

function AddItem({ onAdd, itemsList, isAddItemLoading, className }: AddItemProps) {
    const [itemToAdd, setItemToAdd] = useState<string>('')
    const [quantityValueToAdd, setQuantityValueToAdd] = useState('1')
    const [quantityUnitToAdd, setQuantityUnitToAdd] = useState('NO_UNIT')

    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

    const { data: quantityUnitsData } = useQuantityUnitsQuery()

    const isNewItem = !itemsList.find(({ name }) => name === itemToAdd)

    const addItem = (categoryId: string | null = null) => {
        const quanityUnitItToSend = quantityUnitToAdd === 'NO_UNIT' ? null : Number(quantityUnitToAdd)

        onAdd(itemToAdd, categoryId, Number(quantityValueToAdd), quanityUnitItToSend, () => setItemToAdd(''))
    }

    const quantityUnitOptions = [
        {
            label: 'no unit',
            value: 'NO_UNIT'
        },
        ...(quantityUnitsData?.map((quantityUnit) => ({
            label: quantityUnit.symbol,
            value: quantityUnit.id.toString(10)
        })) || [])
    ]

    return (
        <div className={className}>
            <p>Add an item</p>
            <div className='flex items-end gap-2'>
                <InputField
                    name='quanity'
                    onChange={(e) => setQuantityValueToAdd(e.target.value)}
                    value={quantityValueToAdd}
                    type='number'
                    className='w-[60px] px-[2px]'
                />
                <SelectField
                    name='quantityUnit'
                    onChange={(e) => setQuantityUnitToAdd(e.target.value)}
                    value={quantityUnitToAdd}
                    options={quantityUnitOptions}
                    className='w-20 px-[2px]'
                />
                <ComboBox value={itemToAdd} setValue={setItemToAdd} options={itemsList.map(({ name }) => name)} placeholder='Item name' />
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
