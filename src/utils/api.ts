import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from 'config'
import { User, Credentials, RegisterCredentials } from 'containers/auth/types'

export const appApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => '/user',
            transformResponse: (res: { data: { user: User } }) => res.data.user,
            providesTags: ['User']
        }),
        login: builder.mutation({
            query: (credentials: Credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['User']
        }),
        register: builder.mutation({
            query: (credentials: RegisterCredentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET'
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUserQuery, useLoginMutation, useRegisterMutation, useLogoutMutation } = appApi
