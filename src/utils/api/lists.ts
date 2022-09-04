import { appApi } from 'utils/api'
import { List, NewList } from 'containers/lists/types'

const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getLists: builder.query<List[], void>({
            query: () => '/list',
            transformResponse: (res: { data: { lists: List[] } }) => res.data.lists,
            providesTags: ['Lists']
        }),
        createList: builder.mutation<void, NewList>({
            query: (newList) => ({
                url: '/list',
                method: 'POST',
                body: newList
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Lists'])
        }),
        deleteList: builder.mutation<void, number>({
            query: (id) => ({
                url: `/list/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Lists'])
        }),
        getSingleList: builder.query<List, number>({
            query: () => '/list',
            transformResponse: (res: { data: { list: List } }) => res.data.list,
            providesTags: ['List']
        })
    })
})

export const { useGetListsQuery, useCreateListMutation, useDeleteListMutation, useGetSingleListQuery } = authApi
