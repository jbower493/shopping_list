import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Menu, NewMenu, DetailedMenu, EditMenuPayload, UpdateMenuRecipePayload, MenuRecipe } from 'containers/menus/types'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'
import { fireErrorNotification, queryClient } from 'utils/queryClient'

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

/***** Update menu recipe *****/
const updateMenuRecipe = ({
    menuId,
    recipeId,
    attributes
}: {
    menuId: string
    recipeId: string
    attributes: UpdateMenuRecipePayload
}): Promise<MutationResponse> => axios.put(`/menu/${menuId}/update-menu-recipe/${recipeId}`, attributes)

export function useUpdateMenuRecipeMutation() {
    return useMutation({
        mutationFn: updateMenuRecipe,
        onMutate: async (payload) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            queryClient.cancelQueries(singleMenuQueryKey(payload.menuId))

            // Snapshot the data of the current queries
            type SingleMenuQueryData = Awaited<ReturnType<typeof getSingleMenu>> | undefined
            const singleMenuQueryData: SingleMenuQueryData = queryClient.getQueryData(singleMenuQueryKey(payload.menuId))

            // Optimistically update to new value
            queryClient.setQueryData(singleMenuQueryKey(payload.menuId), (old: SingleMenuQueryData) => {
                if (!old) return undefined

                const newRecipes: MenuRecipe[] = old.data.menu.recipes.map((recipe) =>
                    recipe.id === Number(payload.recipeId) ? { ...recipe, day_of_week: { day: payload.attributes.day } } : recipe
                )

                const newData: SingleMenuQueryData = {
                    data: {
                        menu: {
                            ...old.data.menu,
                            recipes: newRecipes
                        }
                    },
                    message: old.message
                }

                return newData
            })

            // Return context object with the current data
            return {
                singleMenuQueryData: singleMenuQueryData
            }
        },
        onSuccess: (data, variables) => {
            // Invalidate affected queries on success
            queryClient.invalidateQueries(singleMenuQueryKey(variables.menuId))
        },
        onError: (err, variables, context) => {
            // Roll back to old data on error
            queryClient.setQueryData(singleMenuQueryKey(variables.menuId), context?.singleMenuQueryData)
            fireErrorNotification(err)
        }
    })
}
