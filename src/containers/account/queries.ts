import { QueryKeySet } from 'utils/queryClient/keyFactory'
import { QueryResponse } from 'utils/queryClient/types'
import { AccountAccess, AdditionalUser } from './types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

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
