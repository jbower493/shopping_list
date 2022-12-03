export interface Item {
    id: number
    name: string
}

export interface NewItem {
    name: string
    category_id?: number | null
}
