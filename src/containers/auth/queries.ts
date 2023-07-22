import { useQuery, useMutation } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { User, Credentials, RegisterCredentials, RequestPasswordResetPayload, ResetPasswordPayload } from 'containers/auth/types'
import type { MutationResponse } from 'utils/api'

/***** Get user *****/
const getUser = () => axios.get<void, AxiosResponse<{ user: User }>>('/api/user')

export function useGetUserQuery() {
    return useQuery({ queryKey: ['User'], queryFn: getUser })
}

/***** Login *****/
const login = (credentials: Credentials) => axios.post<Credentials, AxiosResponse<MutationResponse>>('/api/login', credentials)

export function useLoginMutation() {
    return useMutation({ mutationFn: login })
}
