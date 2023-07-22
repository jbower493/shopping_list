import { useQuery, useMutation } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { User, Credentials, RegisterCredentials, RequestPasswordResetPayload, ResetPasswordPayload } from 'containers/auth/types'
import type { QueryResponse, MutationResponse } from 'utils/api/types'

/***** Get user *****/
// const getUser = () => axios.get<void, AxiosResponse<QueryResponse<{ user: User }>>>('/user')

const getUser = () => axios.get<QueryResponse<{ user: User }>>('/user')

export function useGetUserQuery() {
    return useQuery({ queryKey: ['User'], queryFn: getUser, select: (response) => response.data.data.user })
}

/***** Login *****/
const login = (credentials: Credentials) => axios.post<Credentials, AxiosResponse<MutationResponse>>('/login', credentials)

export function useLoginMutation() {
    return useMutation({ mutationFn: login })
}
