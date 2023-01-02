import { Item } from 'containers/items/types'

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
    items: Item[]
}

export interface AddItemToListPayload {
    listId: string
    itemName: string
    categoryId?: string
}
