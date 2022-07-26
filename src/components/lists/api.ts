import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { List } from './models'

export const listsApi = createApi({
    reducerPath: 'listsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
    endpoints: (builder) => ({
        getLists: builder.query<List[], void>({
            query: () => 'lists'
        })
    })
})

export const { useGetListsQuery } = listsApi
