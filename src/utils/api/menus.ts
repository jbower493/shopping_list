import { appApi } from 'utils/api'
import { Menu, NewMenu, DetailedMenu } from 'containers/menus/types'
import type { MutationResponse } from 'utils/api'

const menusApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getMenus: builder.query<Menu[], void>({
            query: () => '/menu',
            transformResponse: (res: { data: { menus: Menu[] } }) => res.data.menus,
            providesTags: ['Menus']
        }),
        createMenu: builder.mutation<MutationResponse, NewMenu>({
            query: (newMenu) => ({
                url: '/menu',
                method: 'POST',
                body: newMenu
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Menus'])
        }),
        deleteMenu: builder.mutation<MutationResponse, string>({
            query: (id) => ({
                url: `/menu/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Menus'])
        }),
        getSingleMenu: builder.query<DetailedMenu, string>({
            query: (id) => `/menu/${id}`,
            transformResponse: (res: { data: { menu: DetailedMenu } }) => res.data.menu,
            providesTags: ['Menu']
        }),
        addRecipeToMenu: builder.mutation<MutationResponse, { menuId: string; recipeId: number }>({
            query: ({ menuId, recipeId }) => ({
                url: `/menu/${menuId}/add-recipe/${recipeId}`,
                method: 'POST'
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Menu'])
        }),
        removeRecipeFromMenu: builder.mutation<MutationResponse, { menuId: string; recipeId: number }>({
            query: ({ menuId, recipeId }) => ({
                url: `/menu/${menuId}/remove-recipe`,
                method: 'POST',
                body: { recipe_id: recipeId }
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Menu'])
        })
    })
})

export const {
    useGetMenusQuery,
    useCreateMenuMutation,
    useDeleteMenuMutation,
    useGetSingleMenuQuery,
    useAddRecipeToMenuMutation,
    useRemoveRecipeFromMenuMutation
} = menusApi
