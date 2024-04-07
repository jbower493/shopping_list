import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { EditItemPayload, Item, NewItem } from 'containers/items/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'

const itemsKeySet = new QueryKeySet('Item')

/***** Get items *****/
export const getItems = (): Promise<QueryResponse<{ items: Item[] }>> => axios.get('/item')
export const itemsQueryKey = itemsKeySet.many

export function useGetItemsQuery() {
    return useQuery({
        queryKey: itemsQueryKey(),
        queryFn: getItems,
        select: (res) => res.data.items
    })
}

/***** Create item *****/
const createItem = (newItem: NewItem): Promise<MutationResponse> => axios.post('/item', newItem)

export function useCreateItemMutation() {
    return useMutation({
        mutationFn: createItem
    })
}

/***** Delete item *****/
const deleteItem = (id: string): Promise<MutationResponse> => axios.delete(`/item/${id}`)

export function useDeleteItemMutation() {
    return useMutation({
        mutationFn: deleteItem
    })
}

/***** Edit item *****/
const editItem = ({ itemId, attributes }: { itemId: string; attributes: EditItemPayload }): Promise<MutationResponse> =>
    axios.put(`/item/${itemId}`, attributes)

export function useEditItemMutation() {
    return useMutation({
        mutationFn: editItem
    })
}
