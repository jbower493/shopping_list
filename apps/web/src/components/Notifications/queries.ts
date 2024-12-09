import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { QueryKeySet } from 'utils/queryClient/keyFactory'
import { QueryResponse } from 'utils/queryClient/types'
import { Notification } from './types'

const notificationsKeySet = new QueryKeySet('Notifications')

/***** Get notifications *****/
export const notificationsQueryKey = notificationsKeySet.many
const getNotifications = (): Promise<QueryResponse<{ notifications: Notification[] }>> => axios.get('/user/notifications')

export function useNotificationsQuery() {
    return useQuery({ queryKey: notificationsQueryKey(), queryFn: getNotifications, select: (response) => response.data })
}
