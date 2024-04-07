import type { Category } from 'containers/categories/types'

export interface Item {
    id: number
    name: string
    category: Category | null
}

export interface NewItem {
    name: string
    category_id?: number | null
}

export interface EditItemPayload {
    name: string
    category_id: number | null
}
