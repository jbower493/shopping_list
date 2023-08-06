import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { List, NewList, DetailedList, AddItemToListPayload } from 'containers/lists/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'
import { fireErrorNotification, queryClient } from 'utils/queryClient'
import { itemsQueryKey } from 'containers/items/queries'
import { request } from 'utils/queryClient/request'
import { categoriesQueryKey, getCategories } from 'containers/categories/queries'

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

            // Snapshot the data of the current queries
            type SingleListQueryData = Awaited<ReturnType<typeof getSingleList>> | undefined
            const singleListQueryData: SingleListQueryData = queryClient.getQueryData(singleListQueryKey(payload.listId))

            type CategoriesQueryData = Awaited<ReturnType<typeof getCategories>> | undefined
            const categoriesQueryData: CategoriesQueryData = queryClient.getQueryData(categoriesQueryKey())

            // Optimistically update to new value
            queryClient.setQueryData(singleListQueryKey(payload.listId), (old: SingleListQueryData) => {
                if (!old) return undefined

                const getNewItemCategory = () => {
                    if (!payload.categoryId) return null
                    return {
                        id: Number(payload.categoryId),
                        name: categoriesQueryData?.categories.find(({ id }) => id.toString() === payload.categoryId)?.name || ''
                    }
                }

                const newData: SingleListQueryData = {
                    list: {
                        ...old.list,
                        items: [
                            ...old.list.items,
                            {
                                id: 0,
                                name: payload.itemName,
                                category: getNewItemCategory()
                            }
                        ]
                    }
                }

                return newData
            })

            // Return context object with the current data
            return {
                singleListQueryData: singleListQueryData
            }
        },
        onSuccess: (data, variables) => {
            // Invalidate affected queries on success
            queryClient.invalidateQueries(singleListQueryKey(variables.listId))
            queryClient.invalidateQueries(itemsQueryKey())
        },
        onError: (err, variables, context) => {
            // Roll back to old data on error
            queryClient.setQueryData(singleListQueryKey(variables.listId), context?.singleListQueryData)
            fireErrorNotification(err)
        }
    })
}

// TODO: when you delete multiple in quick succession, the "old data" is wrong, so things jump in and out of the list. This needs fixing
/***** Remove item from list *****/
const removeItemFromList = ({ listId, itemId }: { listId: string; itemId: number }) =>
    axios.post<MutationResponse>(`/list/${listId}/remove-item`, { item_id: itemId })

export function useRemoveItemFromListMutation() {
    return useMutation({
        mutationFn: removeItemFromList,
        onMutate: async (payload) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            queryClient.cancelQueries(singleListQueryKey(payload.listId))

            // Snapshot the data of the current queries
            type SingleListQueryData = Awaited<ReturnType<typeof getSingleList>> | undefined
            const singleListQueryData: SingleListQueryData = queryClient.getQueryData(singleListQueryKey(payload.listId))

            // Optimistically update to new value
            queryClient.setQueryData(singleListQueryKey(payload.listId), (old: SingleListQueryData) => {
                if (!old) return undefined

                const newData: SingleListQueryData = {
                    list: {
                        ...old.list,
                        items: old.list.items.filter((item) => item.id !== payload.itemId)
                    }
                }

                return newData
            })

            // Return context object with the current data
            return {
                singleListQueryData: singleListQueryData
            }
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(singleListQueryKey(variables.listId))
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(singleListQueryKey(variables.listId), context?.singleListQueryData)
            fireErrorNotification(err)
        }
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
