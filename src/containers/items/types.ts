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

export interface BulkAssignCategoryPayload {
    category_id: number | null
    item_ids: number[]
}
