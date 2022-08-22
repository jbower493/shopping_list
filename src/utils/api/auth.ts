import { appApi } from 'utils/api'
import { User, Credentials, RegisterCredentials } from 'containers/auth/types'

const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => '/user',
            transformResponse: (res: { data: { user: User } }) => res.data.user,
            providesTags: ['User']
        }),
        login: builder.mutation<void, Credentials>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['User']
        }),
        register: builder.mutation<void, RegisterCredentials>({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'GET'
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUserQuery, useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi
