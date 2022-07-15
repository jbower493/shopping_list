import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { List } from '../../models/List'

// Define a service using a base URL and expected endpoints
export const listsApi = createApi({
    reducerPath: 'listsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        }
    }),
    endpoints: (builder) => ({
        getLists: builder.query<List[], void>({
            query: () => `lists`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListsQuery } = listsApi
