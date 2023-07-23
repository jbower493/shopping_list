import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Recipe, NewRecipe, DetailedRecipe, AddItemToRecipePayload } from 'containers/recipes/types'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'

/***** Get recipes *****/
const getRecipes = () => axios.get<QueryResponse<{ recipes: Recipe[] }>>('/recipe')
export const getRecipesKey = ['Recipes']

export function useGetRecipesQuery() {
    return useQuery({
        queryKey: getRecipesKey,
        queryFn: getRecipes,
        select: (res) => res.data.data.recipes
    })
}

/***** Create recipe *****/
const createRecipe = (newRecipe: NewRecipe) => axios.post<MutationResponse>('/recipe', newRecipe)

export function useCreateRecipeMutation() {
    return useMutation({
        mutationFn: createRecipe
    })
}

/***** Delete recipe *****/
const deleteRecipe = (id: string) => axios.delete<MutationResponse>(`/recipe/${id}`)

export function useDeleteRecipeMutation() {
    return useMutation({
        mutationFn: deleteRecipe
    })
}

/***** Get single recipe *****/
const getSingleRecipe = (id: string) => axios.get<QueryResponse<{ recipe: DetailedRecipe }>>(`/recipe/${id}`)
export const getSingleRecipeKey = ['Recipe']

export function useGetSingleRecipeQuery(id: string) {
    return useQuery({
        queryKey: getSingleRecipeKey,
        queryFn: () => getSingleRecipe(id),
        select: (res) => res.data.data.recipe
    })
}

/***** Add item to recipe *****/
const addItemToRecipe = ({ recipeId, itemName, categoryId }: AddItemToRecipePayload) => {
    const body: { item_name: string; category_id?: string } = { item_name: itemName }

    if (categoryId) body.category_id = categoryId

    return axios.post<MutationResponse>(`/recipe/${recipeId}/add-item`, body)
}

export function useAddItemToRecipeMutation() {
    return useMutation({
        mutationFn: addItemToRecipe
    })
}

/***** Remove item from recipe *****/
const removeItemFromRecipe = ({ recipeId, itemId }: { recipeId: string; itemId: number }) =>
    axios.post<MutationResponse>(`/recipe/${recipeId}/remove-item`, { item_id: itemId })

export function useRemoveItemFromRecipeMutation() {
    return useMutation({
        mutationFn: removeItemFromRecipe
    })
}
