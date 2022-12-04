import { Recipe as RecipeType } from 'containers/recipes/types'

export interface Menu {
    id: number
    name: string
}

export interface NewMenu {
    name: string
}

export interface DetailedMenu {
    id: number
    name: string
    recipes: RecipeType[]
}
