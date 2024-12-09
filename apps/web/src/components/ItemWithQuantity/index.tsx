import React from 'react'
import type { QuantityUnit } from 'containers/quantityUnits/types'

interface ItemWithQuantityProps {
    quantityValue: number
    unitSymbol: QuantityUnit['symbol'] | undefined
    itemName: string
}

const unitSymbolsWithSpace: QuantityUnit['symbol'][] = ['cups', 'fl.oz', 'lbs', 'oz', 'tbsp', 'tsp']

const ItemWithQuantity: React.FC<ItemWithQuantityProps> = ({ quantityValue, unitSymbol, itemName }) => {
    return (
        <p>
            <span className='mr-2 text-sm text-primary'>
                {quantityValue}
                {unitSymbol && unitSymbolsWithSpace.includes(unitSymbol) ? ' ' : ''}
                {unitSymbol || ''}
            </span>
            <span>{itemName}</span>
        </p>
    )
}

export default ItemWithQuantity
