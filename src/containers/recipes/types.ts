import { Item } from 'containers/items/types'

export interface Recipe {
    id: number
    name: string
}

export interface NewRecipe {
    name: string
}

export interface DetailedRecipe {
    id: number
    name: string
    items: Item[]
}
