import { appApi } from 'utils/api'
import type { Item, NewItem, BulkAssignCategoryPayload } from 'containers/items/types'
import type { MutationResponse } from 'utils/api'

const itemsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query<Item[], void>({
            query: () => '/item',
            transformResponse: (res: { data: { items: Item[] } }) => res.data.items,
            providesTags: ['Items']
        }),
        createItem: builder.mutation<MutationResponse, NewItem>({
            query: (newItem) => ({
                url: '/item',
                method: 'POST',
                body: newItem
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Items'])
        }),
        deleteItem: builder.mutation<MutationResponse, string>({
            query: (id) => ({
                url: `/item/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Items'])
        }),
        bulkAssignCategory: builder.mutation<MutationResponse, BulkAssignCategoryPayload>({
            query: (payload) => ({
                url: '/item/category/bulk',
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Items', 'List'])
        })
    })
})

export const { useGetItemsQuery, useCreateItemMutation, useDeleteItemMutation, useBulkAssignCategoryMutation } = itemsApi
