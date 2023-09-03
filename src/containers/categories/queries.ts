import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Category, NewCategory } from 'containers/categories/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'
import type { MutationResponse } from 'utils/queryClient/types'

const categoriesKeySet = new QueryKeySet('Category')

/***** Get categories *****/
export const getCategories = (): Promise<{ categories: Category[] }> => axios.get('/category')
export const categoriesQueryKey = categoriesKeySet.many

export function useGetCategoriesQuery() {
    return useQuery({
        queryKey: categoriesQueryKey(),
        queryFn: getCategories,
        select: (res) => res.categories
    })
}

/***** Create category *****/
const createCategory = (newCategory: NewCategory): Promise<MutationResponse> => axios.post('/category', newCategory)

export function useCreateCategoryMutation() {
    return useMutation({
        mutationFn: createCategory
    })
}

/***** Delete category *****/
const deleteCategory = (id: string): Promise<MutationResponse> => axios.delete(`/category/${id}`)

export function useDeleteCategoryMutation() {
    return useMutation({
        mutationFn: deleteCategory
    })
}
