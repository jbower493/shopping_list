import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Menu, NewMenu, DetailedMenu } from 'containers/menus/types'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'

const menusKeySet = new QueryKeySet('Menu')

/***** Get menus *****/
const getMenus = () => axios.get<QueryResponse<{ menus: Menu[] }>>('/menu')
export const menusQueryKey = menusKeySet.many

export function useGetMenusQuery() {
    return useQuery({
        queryKey: menusQueryKey(),
        queryFn: getMenus,
        select: (res) => res.data.data.menus
    })
}

/***** Create menu *****/
const createMenu = (newMenu: NewMenu) => axios.post<MutationResponse>('/menu', newMenu)

export function useCreateMenuMutation() {
    return useMutation({
        mutationFn: createMenu
    })
}

/***** Delete menu *****/
const deleteMenu = (id: string) => axios.delete<MutationResponse>(`/menu/${id}`)

export function useDeleteMenuMutation() {
    return useMutation({
        mutationFn: deleteMenu
    })
}

/***** Get single menu *****/
const getSingleMenu = (id: string) => axios.get<QueryResponse<{ menu: DetailedMenu }>>(`/menu/${id}`)
export const singleMenuQueryKey = menusKeySet.one

export function useGetSingleMenuQuery(id: string) {
    return useQuery({
        queryKey: singleMenuQueryKey(id),
        queryFn: () => getSingleMenu(id),
        select: (res) => res.data.data.menu
    })
}

/***** Add recipe to menu *****/
const addRecipeToMenu = ({ menuId, recipeId }: { menuId: string; recipeId: string }) =>
    axios.post<MutationResponse>(`/menu/${menuId}/add-recipe/${recipeId}`)

export function useAddRecipeToMenuMutation() {
    return useMutation({
        mutationFn: addRecipeToMenu
    })
}

/***** Remove recipe from menu *****/
const removeRecipeFromMenu = ({ menuId, recipeId }: { menuId: string; recipeId: number }) =>
    axios.post<MutationResponse>(`/menu/${menuId}/remove-recipe`, { recipe_id: recipeId })

export function useRemoveRecipeFromMenuMutation() {
    return useMutation({
        mutationFn: removeRecipeFromMenu
    })
}
