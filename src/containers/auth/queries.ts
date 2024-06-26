import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import {
    User,
    Credentials,
    RegisterCredentials,
    RequestPasswordResetPayload,
    ResetPasswordPayload,
    UserDataAdditionalUser
} from 'containers/auth/types'
import { userQueryKey } from 'utils/queryClient/keyFactory'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'

/***** Get user *****/
const getUser = (): Promise<QueryResponse<{ user: User; additional_user: UserDataAdditionalUser | null }>> => axios.get('/user')

export function useGetUserQuery() {
    return useQuery({ queryKey: userQueryKey, queryFn: getUser, select: (response) => response.data })
}

/***** Login *****/
const login = (credentials: Credentials): Promise<MutationResponse> => axios.post('/login', credentials)

export function useLoginMutation() {
    return useMutation({
        mutationFn: login
    })
}

/***** Register *****/
const register = (credentials: RegisterCredentials): Promise<MutationResponse> => axios.post('/register', credentials)

export function useRegisterMutation() {
    return useMutation({
        mutationFn: register
    })
}

/***** Logout *****/
const logout = (): Promise<MutationResponse> => axios.get('/logout')

export function useLogoutMutation() {
    return useMutation({
        mutationFn: logout
    })
}

/***** Request password reset *****/
const requestPaswordReset = (payload: RequestPasswordResetPayload): Promise<MutationResponse> => axios.post('/forgot-password', payload)

export function useRequestPasswordResetMutation() {
    return useMutation({
        mutationFn: requestPaswordReset
    })
}

/***** Reset password *****/
const resetPassword = (payload: ResetPasswordPayload): Promise<MutationResponse> => axios.post('/reset-password', payload)

export function useResetPasswordMutation() {
    return useMutation({
        mutationFn: resetPassword
    })
}
