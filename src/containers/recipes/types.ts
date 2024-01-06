import { Item } from 'containers/items/types'
import { RecipeCategory } from 'containers/recipeCategories/types'

export interface Recipe {
    id: number
    name: string
    recipe_category: RecipeCategory | null
}

export interface NewRecipe {
    name: string
    recipe_category_id?: number | null
}

export interface DetailedRecipe {
    id: number
    name: string
    instructions: string | null
    items: Item[]
    recipe_category: RecipeCategory | null
}

export interface AddItemToRecipePayload {
    recipeId: string
    itemName: string
    categoryId?: string
}

export interface EditRecipePayload {
    name: string
    instructions?: string
    recipe_category_id?: number | null
}
