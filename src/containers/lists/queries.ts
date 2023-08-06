import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { List, NewList, DetailedList, AddItemToListPayload } from 'containers/lists/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'
import { queryClient } from 'utils/queryClient'
import { itemsQueryKey, getItems } from 'containers/items/queries'
import { request } from 'utils/queryClient/request'

const listsKeySet = new QueryKeySet('List')

/***** Get lists *****/
const getLists = () => axios.get<QueryResponse<{ lists: List[] }>>('/list')
export const listsQueryKey = listsKeySet.many

export function useListsQuery() {
    return useQuery({
        queryKey: listsQueryKey(),
        queryFn: getLists,
        select: (res) => res.data.data.lists
    })
}

/***** Create list *****/
const createList = (newList: NewList) => request.post<NewList>('/list', newList)

export function useCreateListMutation() {
    return useMutation({
        mutationFn: createList
    })
}

/***** Delete list *****/
const deleteList = (id: string) => axios.delete<MutationResponse>(`/list/${id}`)

export function useDeleteListMutation() {
    return useMutation({
        mutationFn: deleteList
    })
}

/***** Get single list *****/
const getSingleList = (id: string) => request.get<{ list: DetailedList }>(`/list/${id}`)
export const singleListQueryKey = listsKeySet.one

export function useGetSingleListQuery(id: string) {
    return useQuery({
        queryKey: singleListQueryKey(id),
        queryFn: () => getSingleList(id),
        select: (res) => res.list
    })
}

/***** Add item to list *****/
const addItemToList = ({ listId, itemName, categoryId }: AddItemToListPayload) => {
    const body: { item_name: string; category_id?: string } = {
        item_name: itemName
    }

    if (categoryId) body.category_id = categoryId

    return axios.post<MutationResponse>(`/list/${listId}/add-item`, body)
}

export function useAddItemToListMutation() {
    return useMutation({
        mutationFn: addItemToList,
        onMutate: async (payload) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            queryClient.cancelQueries(singleListQueryKey(payload.listId))
            queryClient.cancelQueries(itemsQueryKey())

            // Snapshot the data of the current queries
            type SingleListQueryData = Awaited<ReturnType<typeof getSingleList>> | undefined
            const singleListQueryData: SingleListQueryData = queryClient.getQueryData(singleListQueryKey(payload.listId))

            type ItemsQueryData = Awaited<ReturnType<typeof getItems>> | undefined
            const itemsQueryData: ItemsQueryData = queryClient.getQueryData(itemsQueryKey())

            // Optimistically update to new value
            queryClient.setQueryData(singleListQueryKey(payload.listId), (old: SingleListQueryData) => {
                if (!old) return undefined
                // TODO: make sure the list order is correct, currently it adds it in the wrong place and then it changes once the refetch is finished
                const newData: SingleListQueryData = {
                    list: {
                        ...old.list,
                        items: [
                            ...old.list.items,
                            {
                                id: 1,
                                name: payload.itemName,
                                category: null
                            }
                        ]
                    }
                }

                return newData
            })
            // queryClient.setQueryData(['todos'], (old) => {

            // })

            // Return context object with the current data
            return {
                singleListQueryData: singleListQueryData?.list,
                itemsQueryData: itemsQueryData?.data.data.items
            }
        }
        // onSuccess: () => {
        //     setAnyChanges(true)
        //     clearInput()
        //     queryClient.invalidateQueries(singleListQueryKey(listIdSafe.toString()))
        //     queryClient.invalidateQueries(itemsQueryKey())
        // }
    })
}

/***** Remove item from list *****/
const removeItemFromList = ({ listId, itemId }: { listId: string; itemId: number }) =>
    axios.post<MutationResponse>(`/list/${listId}/remove-item`, { item_id: itemId })

export function useRemoveItemFromListMutation() {
    return useMutation({
        mutationFn: removeItemFromList
    })
}

/***** Add items from recipe *****/
const addItemsFromRecipe = ({ listId, recipeId }: { listId: string; recipeId: string }) =>
    axios.post<MutationResponse>(`/list/${listId}/add-from-recipe/${recipeId}`)

export function useAddItemsFromRecipeMutation() {
    return useMutation({
        mutationFn: addItemsFromRecipe
    })
}

/***** Add items from menu *****/
const addItemsFromMenu = ({ listId, menuId }: { listId: string; menuId: string }) =>
    axios.post<MutationResponse>(`/list/${listId}/add-from-menu/${menuId}`)

export function useAddItemsFromMenuMutation() {
    return useMutation({
        mutationFn: addItemsFromMenu
    })
}
