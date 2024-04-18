import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Menu, NewMenu, DetailedMenu, EditMenuPayload } from 'containers/menus/types'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'

const menusKeySet = new QueryKeySet('Menu')

/***** Get menus *****/
const getMenus = (): Promise<QueryResponse<{ menus: Menu[] }>> => axios.get('/menu')
export const menusQueryKey = menusKeySet.many

export function useGetMenusQuery() {
    return useQuery({
        queryKey: menusQueryKey(),
        queryFn: getMenus,
        select: (res) => res.data.menus
    })
}

/***** Create menu *****/
const createMenu = (newMenu: NewMenu): Promise<MutationResponse> => axios.post('/menu', newMenu)

export function useCreateMenuMutation() {
    return useMutation({
        mutationFn: createMenu
    })
}

/***** Delete menu *****/
const deleteMenu = (id: string): Promise<MutationResponse> => axios.delete(`/menu/${id}`)

export function useDeleteMenuMutation() {
    return useMutation({
        mutationFn: deleteMenu
    })
}

/***** Get single menu *****/
const getSingleMenu = (id: string): Promise<QueryResponse<{ menu: DetailedMenu }>> => axios.get(`/menu/${id}`)
export const singleMenuQueryKey = menusKeySet.one

export function useGetSingleMenuQuery(id: string) {
    return useQuery({
        queryKey: singleMenuQueryKey(id),
        queryFn: () => getSingleMenu(id),
        select: (res) => res.data.menu
    })
}

/***** Add recipe to menu *****/
const addRecipeToMenu = ({ menuId, recipeId, day }: { menuId: string; recipeId: string; day: string | null }): Promise<MutationResponse> =>
    axios.post(`/menu/${menuId}/add-recipe/${recipeId}`, { day })

export function useAddRecipeToMenuMutation() {
    return useMutation({
        mutationFn: addRecipeToMenu
    })
}

/***** Remove recipe from menu *****/
const removeRecipeFromMenu = ({ menuId, recipeId }: { menuId: string; recipeId: number }): Promise<MutationResponse> =>
    axios.post(`/menu/${menuId}/remove-recipe`, { recipe_id: recipeId })

export function useRemoveRecipeFromMenuMutation() {
    return useMutation({
        mutationFn: removeRecipeFromMenu
    })
}

/***** Edit menu *****/
const editMenu = ({ menuId, attributes }: { menuId: string; attributes: EditMenuPayload }): Promise<MutationResponse> =>
    axios.put(`/menu/${menuId}`, attributes)

export function useEditMenuMutation() {
    return useMutation({
        mutationFn: editMenu
    })
}
