import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { List, NewList, DetailedList, AddItemToListPayload } from 'containers/lists/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'

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
const createList = (newList: NewList) => axios.post<MutationResponse>('/list', newList)

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
const getSingleList = (id: string) => axios.get<QueryResponse<{ list: DetailedList }>>(`/list/${id}`)
export const singleListQueryKey = listsKeySet.one

export function useGetSingleListQuery(id: string) {
    return useQuery({
        queryKey: singleListQueryKey(id),
        queryFn: () => getSingleList(id),
        select: (res) => res.data.data.list
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
        mutationFn: addItemToList
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
