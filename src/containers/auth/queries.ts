import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { User, Credentials, RegisterCredentials, RequestPasswordResetPayload, ResetPasswordPayload } from 'containers/auth/types'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'

/***** Get user *****/
const getUser = () => axios.get<QueryResponse<{ user: User }>>('/user')
export const getUserKey = ['User']

export function useGetUserQuery() {
    return useQuery({ queryKey: getUserKey, queryFn: getUser, select: (response) => response.data.data.user })
}

/***** Login *****/
const login = (credentials: Credentials) => axios.post<MutationResponse>('/login', credentials)

export function useLoginMutation() {
    return useMutation({
        mutationFn: login
    })
}

/***** Register *****/
const register = (credentials: RegisterCredentials) => axios.post<MutationResponse>('/register', credentials)

export function useRegisterMutation() {
    return useMutation({
        mutationFn: register
    })
}

/***** Logout *****/
const logout = () => axios.get<MutationResponse>('/logout')

export function useLogoutMutation() {
    return useMutation({
        mutationFn: logout
    })
}

/***** Request password reset *****/
const requestPaswordReset = (payload: RequestPasswordResetPayload) => axios.post<MutationResponse>('/forgot-password', payload)

export function useRequestPasswordResetMutation() {
    return useMutation({
        mutationFn: requestPaswordReset
    })
}

/***** Reset password *****/
const resetPassword = (payload: ResetPasswordPayload) => axios.post<MutationResponse>('/reset-password', payload)

export function useResetPasswordMutation() {
    return useMutation({
        mutationFn: resetPassword
    })
}
