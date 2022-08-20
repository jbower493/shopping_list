import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from 'config'

export const appApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
    tagTypes: ['User'],
    endpoints: () => ({})
})
