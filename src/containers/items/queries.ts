import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { Item, NewItem, BulkAssignCategoryPayload } from 'containers/items/types'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'

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

/***** Delete item *****/
const deleteItem = (id: string) => axios.delete<MutationResponse>(`/item/${id}`)

export function useDeleteItemMutation() {
    return useMutation({
        mutationFn: deleteItem
    })
}

/***** Bulk assign category *****/
const bulkAssignCategory = ({ category_id, item_ids }: BulkAssignCategoryPayload) =>
    axios.put<MutationResponse>(`/item/category/${category_id}/bulk`, { item_ids })

export function useBulkAssignCategoryMutation() {
    return useMutation({
        mutationFn: bulkAssignCategory
    })
}