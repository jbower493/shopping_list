import { appApi } from 'utils/api'
import { Recipe, NewRecipe, DetailedRecipe } from 'containers/recipes/types'
import type { MutationResponse } from 'utils/api'

const recipesApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query<Recipe[], void>({
            query: () => '/recipe',
            transformResponse: (res: { data: { recipes: Recipe[] } }) => res.data.recipes,
            providesTags: ['Recipes']
        }),
        createRecipe: builder.mutation<MutationResponse, NewRecipe>({
            query: (newRecipe) => ({
                url: '/recipe',
                method: 'POST',
                body: newRecipe
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Recipes'])
        }),
        deleteRecipe: builder.mutation<MutationResponse, string>({
            query: (id) => ({
                url: `/recipe/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Recipes'])
        }),
        getSingleRecipe: builder.query<DetailedRecipe, string>({
            query: (id) => `/recipe/${id}`,
            transformResponse: (res: { data: { recipe: DetailedRecipe } }) => res.data.recipe,
            providesTags: ['Recipe']
        }),
        addItemToRecipe: builder.mutation<MutationResponse, { recipeId: string; itemName: string }>({
            query: ({ recipeId, itemName }) => ({
                url: `/recipe/${recipeId}/add-item`,
                method: 'POST',
                body: { item_name: itemName }
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Recipe', 'Items'])
        }),
        removeItemFromRecipe: builder.mutation<MutationResponse, { recipeId: string; itemId: number }>({
            query: ({ recipeId, itemId }) => ({
                url: `/recipe/${recipeId}/remove-item`,
                method: 'POST',
                body: { item_id: itemId }
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Recipe'])
        })
    })
})

export const {
    useGetRecipesQuery,
    useCreateRecipeMutation,
    useDeleteRecipeMutation,
    useGetSingleRecipeQuery,
    useAddItemToRecipeMutation,
    useRemoveItemFromRecipeMutation
} = recipesApi
