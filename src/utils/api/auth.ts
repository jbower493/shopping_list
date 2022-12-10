import { appApi } from 'utils/api'
import { User, Credentials, RegisterCredentials, RequestPasswordResetPayload, ResetPasswordPayload } from 'containers/auth/types'
import type { MutationResponse } from 'utils/api'

const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => '/user',
            transformResponse: (res: { data: { user: User } }) => res.data.user,
            providesTags: ['User']
        }),
        login: builder.mutation<MutationResponse, Credentials>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: (_, error) => (error ? [] : ['User'])
        }),
        register: builder.mutation<MutationResponse, RegisterCredentials>({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials
            })
        }),
        logout: builder.mutation<MutationResponse, void>({
            query: () => ({
                url: '/logout',
                method: 'GET'
            }),
            invalidatesTags: (_, error) => (error ? [] : ['User'])
        }),
        requestPasswordReset: builder.mutation<MutationResponse, RequestPasswordResetPayload>({
            query: (payload) => ({
                url: '/forgot-password',
                method: 'POST',
                body: payload
            })
        }),
        resetPassword: builder.mutation<MutationResponse, ResetPasswordPayload>({
            query: (payload) => ({
                url: '/reset-password',
                method: 'POST',
                body: payload
            })
        })
    })
})

export const {
    useGetUserQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRequestPasswordResetMutation,
    useResetPasswordMutation
} = authApi
