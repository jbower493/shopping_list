import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { List, NewList, DetailedList, AddItemToListPayload } from 'containers/lists/types'
import type { QueryResponse, MutationResponse } from 'utils/api/types'

/***** Get items *****/
const getItems = () => axios.get<QueryResponse<{ items: Item[] }>>('/item')
export const getItemsKey = ['Items']

export function useGetItemsQuery() {
    return useQuery({
        queryKey: getItemsKey,
        queryFn: getItems,
        select: (res) => res.data.data.items
    })
}

/***** Create item *****/
const createItem = (newItem: NewItem) => axios.post<MutationResponse>('/item', newItem)

export function useCreateItemMutation() {
    return useMutation({
        mutationFn: createItem
    })
}
