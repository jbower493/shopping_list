import { QueryKeySet, userQueryKey } from 'utils/queryClient/keyFactory'
import { MutationResponse, QueryResponse } from 'utils/queryClient/types'
import { AccountAccess, AdditionalUser } from './types'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from 'utils/queryClient'
import toast from 'react-hot-toast'

const additionalUserKeySet = new QueryKeySet('Additional_User')

/***** Get additional users *****/
export const getAdditionalUsers = (): Promise<QueryResponse<{ additional_users: AdditionalUser[] }>> => axios.get('/user/additional-user')
export const additionalUsersQueryKey = additionalUserKeySet.many

export function useAdditionalUsersQuery() {
    return useQuery({
        queryKey: additionalUsersQueryKey(),
        queryFn: getAdditionalUsers,
        select: (res) => res.data.additional_users
    })
}

const accoutAccessKeySet = new QueryKeySet('Account_Access')

/***** Get account access list *****/
export const getAccountAccess = (): Promise<QueryResponse<{ account_access: AccountAccess[] }>> => axios.get('/user/additional-user/account-access')
export const accountAccessQueryKey = accoutAccessKeySet.many

export function useAccountAccessQuery() {
    return useQuery({
        queryKey: accountAccessQueryKey(),
        queryFn: getAccountAccess,
        select: (res) => res.data.account_access
    })
}

/***** Add additional user *****/
const addAdditionalUser = ({ additional_user_email }: { additional_user_email: string }): Promise<MutationResponse> =>
    axios.post('/user/additional-user', { additional_user_email })

export function useAddAdditionalUserMutation() {
    return useMutation({
        mutationFn: addAdditionalUser
    })
}

/***** Remove additional user *****/
const removeAdditionalUser = ({ additional_user_email }: { additional_user_email: string }): Promise<MutationResponse> =>
    axios.post('/user/additional-user/remove', { additional_user_email })

export function useRemoveAdditionalUserMutation() {
    return useMutation({
        mutationFn: removeAdditionalUser
    })
}

/***** Login as another user *****/
const loginAsAnotherUser = ({ user_email_to_login_as }: { user_email_to_login_as: string }): Promise<MutationResponse> =>
    axios.post('/user/additional-user/login-as-another-user', { user_email_to_login_as })

export function useLoginAsAnotherUserMutation() {
    return useMutation({
        mutationFn: loginAsAnotherUser,
        onSuccess(res) {
            toast.success(res.message)
            queryClient.invalidateQueries(userQueryKey)
        }
    })
}

/***** Change email *****/
const changeEmail = ({ new_email }: { new_email: string }): Promise<MutationResponse> => axios.post('/user/change-email', { new_email })

export function useChangeEmailMutation() {
    return useMutation({
        mutationFn: changeEmail
    })
}

/***** Change password *****/
const changePassword = (attributes: { new_password: string; confirm_new_password: string }): Promise<MutationResponse> =>
    axios.post('/user/change-password', attributes)

export function useChangePasswordMutation() {
    return useMutation({
        mutationFn: changePassword
    })
}
