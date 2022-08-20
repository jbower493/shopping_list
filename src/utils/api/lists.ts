import { appApi } from 'utils/api'
import { List } from 'containers/lists/types'

const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getLists: builder.query<List[], void>({
            query: () => '/list',
            transformResponse: (res: { data: { lists: List[] } }) => res.data.lists,
            providesTags: ['Lists']
        })
    })
})

export const { useGetListsQuery } = authApi
