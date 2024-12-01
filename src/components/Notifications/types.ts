import { QuantityUnit } from 'containers/quantityUnits/types'

export interface ShareRequest {
    share_request_id: number
    owner_name: string
    recipe_name: string
}

export interface ImportedRecipe {
    imported_recipe_id: number
    recipe: {
        name: string
        instructions: string
        recipe_category: null
        prep_time: number
        serves: number
        items: {
            name: string
            quantity: number
            quantity_unit: QuantityUnit['name']
        }[]
    }
}

export type Notification =
    | {
          type: 'share_request'
          meta: ShareRequest
      }
    | {
          type: 'imported_recipe'
          meta: ImportedRecipe
      }
