import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { RecipeCategory, NewRecipeCategory, EditRecipeCategoryPayload } from 'containers/recipeCategories/types'
import { queryClient } from 'utils/queryClient'
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

export function prefetchGetRecipeCategoriesQuery() {
    queryClient.prefetchQuery({ queryKey: recipeCategoriesQueryKey(), queryFn: getRecipeCategories })
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

/***** Edit recipe category *****/
const editRecipeCategory = ({
    recipeCategoryId,
    attributes
}: {
    recipeCategoryId: string
    attributes: EditRecipeCategoryPayload
}): Promise<MutationResponse> => axios.put(`/recipe-category/${recipeCategoryId}`, attributes)

export function useEditRecipeCategoryMutation() {
    return useMutation({
        mutationFn: editRecipeCategory
    })
}
