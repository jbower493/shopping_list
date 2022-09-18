import { appApi } from 'utils/api'
import { Item, NewItem } from 'containers/items/types'
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
        })
    })
})

export const { useGetItemsQuery, useCreateItemMutation, useDeleteItemMutation } = itemsApi
