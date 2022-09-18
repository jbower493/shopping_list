import { appApi } from 'utils/api'
import { List, NewList, DetailedList } from 'containers/lists/types'
import type { MutationResponse } from 'utils/api'

const itemsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getLists: builder.query<List[], void>({
            query: () => '/list',
            transformResponse: (res: { data: { lists: List[] } }) => res.data.lists,
            providesTags: ['Lists']
        }),
        createList: builder.mutation<MutationResponse, NewList>({
            query: (newList) => ({
                url: '/list',
                method: 'POST',
                body: newList
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Lists'])
        }),
        deleteList: builder.mutation<MutationResponse, string>({
            query: (id) => ({
                url: `/list/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Lists'])
        }),
        getSingleList: builder.query<DetailedList, string>({
            query: (id) => `/list/${id}`,
            transformResponse: (res: { data: { list: DetailedList } }) => res.data.list,
            providesTags: ['List']
        }),
        addItemToList: builder.mutation<MutationResponse, { listId: string; itemId: number }>({
            query: ({ listId, itemId }) => ({
                url: `/list/${listId}/add-item`,
                method: 'POST',
                body: { item_id: itemId }
            }),
            invalidatesTags: (_, error) => (error ? [] : ['List'])
        }),
        removeItemFromList: builder.mutation<MutationResponse, { listId: string; itemId: number }>({
            query: ({ listId, itemId }) => ({
                url: `/list/${listId}/remove-item`,
                method: 'POST',
                body: { item_id: itemId }
            }),
            invalidatesTags: (_, error) => (error ? [] : ['List'])
        })
    })
})

export const {
    useGetListsQuery,
    useCreateListMutation,
    useDeleteListMutation,
    useGetSingleListQuery,
    useAddItemToListMutation,
    useRemoveItemFromListMutation
} = itemsApi
