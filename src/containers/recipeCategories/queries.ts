import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { RecipeCategory, NewRecipeCategory } from 'containers/recipeCategories/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'
import type { MutationResponse, QueryResponse } from 'utils/queryClient/types'

const recipeCategoriesKeySet = new QueryKeySet('RecipeCategory')

/***** Get recipe categories *****/
export const getRecipeCategories = (): Promise<QueryResponse<{ recipe_categories: RecipeCategory[] }>> => axios.get('/recipe-category')
export const recipeCategoriesQueryKey = recipeCategoriesKeySet.many

export function useGetRecipeCategoriesQuery() {
    return useQuery({
        queryKey: recipeCategoriesQueryKey(),
        queryFn: getRecipeCategories,
        select: (res) => res.data.recipe_categories
    })
}

/***** Create recipe category *****/
const createRecipeCategory = (newRecipeCategory: NewRecipeCategory): Promise<MutationResponse> => axios.post('/recipe-category', newRecipeCategory)

export function useCreateRecipeCategoryMutation() {
    return useMutation({
        mutationFn: createRecipeCategory
    })
}

/***** Delete recipe category *****/
const deleteRecipeCategory = (id: string): Promise<MutationResponse> => axios.delete(`/recipe-category/${id}`)

export function useDeleteRecipeCategoryMutation() {
    return useMutation({
        mutationFn: deleteRecipeCategory
    })
}
