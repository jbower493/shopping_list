import { appApi } from 'utils/api'
import { List, NewList, DetailedList } from 'containers/lists/types'
import type { MutationResponse } from 'utils/api'

const listsApi = appApi.injectEndpoints({
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
        addItemToList: builder.mutation<MutationResponse, { listId: string; itemName: string }>({
            query: ({ listId, itemName }) => ({
                url: `/list/${listId}/add-item`,
                method: 'POST',
                body: { item_name: itemName }
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
        }),
        addItemsFromRecipe: builder.mutation<MutationResponse, { listId: string; recipeId: string }>({
            query: ({ listId, recipeId }) => ({
                url: `/list/${listId}/add-from-recipe`,
                method: 'POST',
                body: { recipe_id: recipeId }
            }),
            invalidatesTags: (_, error) => (error ? [] : ['List'])
        }),
        addItemsFromMenu: builder.mutation<MutationResponse, { listId: string; menuId: string }>({
            query: ({ listId, menuId }) => ({
                url: `/list/${listId}/add-from-menu`,
                method: 'POST',
                body: { menu_id: menuId }
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
    useRemoveItemFromListMutation,
    useAddItemsFromRecipeMutation,
    useAddItemsFromMenuMutation
} = listsApi
