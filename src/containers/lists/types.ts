import { Category } from 'containers/categories/types'

export interface List {
    id: number
    name: string
}

export interface NewList {
    name: string
}

export interface DetailedList {
    id: number
    name: string
    items: ListItem[]
}

export interface AddItemToListPayload {
    listId: string
    itemName: string
    categoryId?: string
    quantity: number
    quantityUnitId?: number
}

export interface ListItem {
    id: number
    name: string
    item_quantity: {
        quantity: number
        quantity_unit: {
            name: string
            symbol: string
        } | null
    }
    category: Category | null
}
