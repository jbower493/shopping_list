import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { List, NewList, DetailedList, AddItemToListPayload, ListItem, EditListPayload } from 'containers/lists/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'
import { fireErrorNotification, queryClient } from 'utils/queryClient'
import { getItems, itemsQueryKey } from 'containers/items/queries'
import { categoriesQueryKey, getCategories } from 'containers/categories/queries'
import { getQuantityUnits, quantityUnitsQueryKey } from 'containers/quantityUnits/queries'

const listsKeySet = new QueryKeySet('List')

/***** Get lists *****/
const getLists = (): Promise<QueryResponse<{ lists: List[] }>> => axios.get('/list')
export const listsQueryKey = listsKeySet.many

export function useListsQuery() {
    return useQuery({
        queryKey: listsQueryKey(),
        queryFn: getLists,
        select: (res) => res.data.lists
    })
}

/***** Create list *****/
const createList = (newList: NewList): Promise<MutationResponse> => axios.post('/list', newList)

export function useCreateListMutation() {
    return useMutation({
        mutationFn: createList
    })
}

/***** Delete list *****/
const deleteList = (id: string): Promise<MutationResponse> => axios.delete(`/list/${id}`)

export function useDeleteListMutation() {
    return useMutation({
        mutationFn: deleteList
    })
}

/***** Get single list *****/
const getSingleList = (id: string, signal: AbortSignal | undefined): Promise<QueryResponse<{ list: DetailedList }>> =>
    axios.get(`/list/${id}`, { signal })
export const singleListQueryKey = listsKeySet.one

export function useGetSingleListQuery(id: string) {
    return useQuery({
        queryKey: singleListQueryKey(id),
        queryFn: ({ signal }) => getSingleList(id, signal),
        select: (res) => res.data.list
    })
}

/***** Add item to list *****/
const addItemToList = ({ listId, itemName, categoryId, quantity, quantityUnitId }: AddItemToListPayload): Promise<MutationResponse> => {
    const body: { item_name: string; category_id?: string; quantity: number; quantity_unit_id?: number } = {
        item_name: itemName,
        quantity
    }

    if (categoryId) body.category_id = categoryId
    if (quantityUnitId) body.quantity_unit_id = quantityUnitId

    return axios.post(`/list/${listId}/add-item`, body)
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

            type ItemsQueryData = Awaited<ReturnType<typeof getItems>> | undefined
            const itemsQueryData: ItemsQueryData = queryClient.getQueryData(itemsQueryKey())

            type QuantityUnitsData = Awaited<ReturnType<typeof getQuantityUnits>> | undefined
            const quantityUnitsQueryData: QuantityUnitsData = queryClient.getQueryData(quantityUnitsQueryKey())

            // Optimistically update to new value
            queryClient.setQueryData(singleListQueryKey(payload.listId), (old: SingleListQueryData) => {
                if (!old) return undefined

                const getAddedItemCategory = () => {
                    function getCategoryId() {
                        // If its a new item and therefore it is getting assigned a category on creation
                        if (payload.categoryId) return Number(payload.categoryId)

                        // If its an existing item, check the items list to see what it's category is (if it has a category)
                        const matchingItemCategory = itemsQueryData?.data.items.find(({ name }) => name === payload.itemName)?.category

                        return matchingItemCategory?.id || null
                    }

                    const categoryId = getCategoryId()

                    if (!categoryId) return null
                    return {
                        id: categoryId,
                        name: categoriesQueryData?.data.categories.find(({ id }) => id === categoryId)?.name || ''
                    }
                }

                function getAddedItemQuantity(): ListItem['item_quantity'] {
                    return {
                        quantity: payload.quantity,
                        quantity_unit: payload.quantityUnitId
                            ? quantityUnitsQueryData?.data.quantity_units.find((quantityUnit) => quantityUnit.id === payload.quantityUnitId) || null
                            : null
                    }
                }

                const newItems: ListItem[] = [
                    ...old.data.list.items,
                    {
                        id: 0,
                        name: payload.itemName,
                        category: getAddedItemCategory(),
                        item_quantity: getAddedItemQuantity()
                    }
                ]

                const newData: SingleListQueryData = {
                    data: {
                        list: {
                            ...old.data.list,
                            items: newItems.sort((a, b) => (a.name > b.name ? 1 : -1))
                        }
                    },
                    message: old.message
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

/***** Remove item from list *****/
const removeItemFromList = async ({ listId, itemId }: { listId: string; itemId: number }): Promise<MutationResponse> =>
    axios.post(`/list/${listId}/remove-item`, { item_id: itemId })

export function useRemoveItemFromListMutation() {
    return useMutation({
        mutationFn: removeItemFromList,
        onMutate: (payload) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            queryClient.cancelQueries(singleListQueryKey(payload.listId))

            // Snapshot the data of the current queries
            type SingleListQueryData = Awaited<ReturnType<typeof getSingleList>> | undefined
            const singleListQueryData: SingleListQueryData = queryClient.getQueryData(singleListQueryKey(payload.listId))

            // Optimistically update to new value
            queryClient.setQueryData(singleListQueryKey(payload.listId), (old: SingleListQueryData) => {
                if (!old) return undefined

                const newData: SingleListQueryData = {
                    data: {
                        list: {
                            ...old.data.list,
                            items: old.data.list.items.filter((item) => item.id !== payload.itemId)
                        }
                    },
                    message: old.message
                }

                return newData
            })

            // Return context object with the current data
            return {
                singleListQueryData: singleListQueryData
            }
        },
        onSuccess: (data, variables) => {
            // "isMutating" seems to return 1 for the current mutation even in the on success handler. If "isMutating" is greater than 1, that means that previous deletions are still happening. So we only want to invalidate the cache if its the last deletion
            if (queryClient.isMutating() < 2) {
                queryClient.invalidateQueries(singleListQueryKey(variables.listId))
            }
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(singleListQueryKey(variables.listId), context?.singleListQueryData)
            fireErrorNotification(err)
        }
    })
}

/***** Add items from recipe *****/
const addItemsFromRecipe = ({ listId, recipeId }: { listId: string; recipeId: string }): Promise<MutationResponse> =>
    axios.post(`/list/${listId}/add-from-recipe/${recipeId}`)

export function useAddItemsFromRecipeMutation() {
    return useMutation({
        mutationFn: addItemsFromRecipe
    })
}

/***** Add items from menu *****/
const addItemsFromMenu = ({ listId, menuId }: { listId: string; menuId: string }): Promise<MutationResponse> =>
    axios.post(`/list/${listId}/add-from-menu/${menuId}`)

export function useAddItemsFromMenuMutation() {
    return useMutation({
        mutationFn: addItemsFromMenu
    })
}

/***** Edit list *****/
const editList = ({ listId, attributes }: { listId: string; attributes: EditListPayload }): Promise<MutationResponse> =>
    axios.put(`/list/${listId}`, attributes)

export function useEditListMutation() {
    return useMutation({
        mutationFn: editList
    })
}
