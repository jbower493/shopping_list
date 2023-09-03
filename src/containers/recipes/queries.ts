import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Recipe, NewRecipe, DetailedRecipe, AddItemToRecipePayload } from 'containers/recipes/types'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'

const recipesKeySet = new QueryKeySet('Recipe')

/***** Get recipes *****/
const getRecipes = (): Promise<QueryResponse<{ recipes: Recipe[] }>> => axios.get('/recipe')
export const recipesQueryKey = recipesKeySet.many

export function useGetRecipesQuery() {
    return useQuery({
        queryKey: recipesQueryKey(),
        queryFn: getRecipes,
        select: (res) => res.data.recipes
    })
}

/***** Create recipe *****/
const createRecipe = (newRecipe: NewRecipe): Promise<MutationResponse> => axios.post('/recipe', newRecipe)

export function useCreateRecipeMutation() {
    return useMutation({
        mutationFn: createRecipe
    })
}

/***** Delete recipe *****/
const deleteRecipe = (id: string): Promise<MutationResponse> => axios.delete(`/recipe/${id}`)

export function useDeleteRecipeMutation() {
    return useMutation({
        mutationFn: deleteRecipe
    })
}

/***** Get single recipe *****/
const getSingleRecipe = (id: string): Promise<QueryResponse<{ recipe: DetailedRecipe }>> => axios.get(`/recipe/${id}`)
export const singleRecipeQueryKey = recipesKeySet.one

export function useGetSingleRecipeQuery(id: string) {
    return useQuery({
        queryKey: singleRecipeQueryKey(id),
        queryFn: () => getSingleRecipe(id),
        select: (res) => res.data.recipe
    })
}

/***** Add item to recipe *****/
const addItemToRecipe = ({ recipeId, itemName, categoryId }: AddItemToRecipePayload): Promise<MutationResponse> => {
    const body: { item_name: string; category_id?: string } = { item_name: itemName }

    if (categoryId) body.category_id = categoryId

    return axios.post(`/recipe/${recipeId}/add-item`, body)
}

export function useAddItemToRecipeMutation() {
    return useMutation({
        mutationFn: addItemToRecipe
    })
}

/***** Remove item from recipe *****/
const removeItemFromRecipe = ({ recipeId, itemId }: { recipeId: string; itemId: number }): Promise<MutationResponse> =>
    axios.post(`/recipe/${recipeId}/remove-item`, { item_id: itemId })

export function useRemoveItemFromRecipeMutation() {
    return useMutation({
        mutationFn: removeItemFromRecipe
    })
}
