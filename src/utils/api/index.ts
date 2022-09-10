import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from 'config'

export interface MutationResponse {
    message: string
}

export const appApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json')
            return headers
        }
    }),
    tagTypes: ['User', 'Lists', 'List'],
    endpoints: () => ({})
})
