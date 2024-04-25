import { Category } from 'containers/categories/types'
import { QuantityUnit } from 'containers/quantityUnits/types'
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
    items: RecipeItem[]
    recipe_category: RecipeCategory | null
}

export interface AddItemToRecipePayload {
    recipeId: string
    itemName: string
    categoryId?: string
    quantity: number
    quantityUnitId?: number
}

export interface EditRecipePayload {
    name: string
    instructions?: string
    recipe_category_id?: number | null
}

export interface RecipeItem {
    id: number
    name: string
    item_quantity: {
        quantity: number
        quantity_unit: QuantityUnit | null
    }
    category: Category | null
}
