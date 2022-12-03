import { appApi } from 'utils/api'
import { Category, NewCategory } from 'containers/categories/types'
import type { MutationResponse } from 'utils/api'

const categoriesApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => '/category',
            transformResponse: (res: { data: { categories: Category[] } }) => res.data.categories,
            providesTags: ['Categories']
        }),
        createCategory: builder.mutation<MutationResponse, NewCategory>({
            query: (newCategory) => ({
                url: '/category',
                method: 'POST',
                body: newCategory
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Categories'])
        }),
        deleteCategory: builder.mutation<MutationResponse, string>({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Categories'])
        })
    })
})

export const { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation } = categoriesApi
