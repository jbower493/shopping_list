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
    instructions: string | null
    items: Item[]
}

export interface AddItemToRecipePayload {
    recipeId: string
    itemName: string
    categoryId?: string
}

export interface EditRecipePayload {
    name: string
    instructions?: string
}
