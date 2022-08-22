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
            invalidatesTags: ['Lists']
        }),
        deleteList: builder.mutation<void, number>({
            query: (id) => ({
                url: `/list/${id}`,
                method: 'GET'
            }),
            invalidatesTags: ['Lists']
        })
    })
})

export const { useGetListsQuery, useCreateListMutation, useDeleteListMutation } = authApi
