import React from 'react'

interface ItemWithQuantityProps {
    quantityValue: number
    unitSymbol: string | undefined
    itemName: string
}

const ItemWithQuantity: React.FC<ItemWithQuantityProps> = ({ quantityValue, unitSymbol, itemName }) => {
    return (
        <p>
            <span className='mr-2 text-sm text-primary'>
                {quantityValue}
                {unitSymbol || ''}
            </span>
            <span>{itemName}</span>
        </p>
    )
}

export default ItemWithQuantity
