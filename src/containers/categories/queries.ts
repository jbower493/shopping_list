import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Category, NewCategory } from 'containers/categories/types'
import { QueryKeySet } from 'utils/queryClient/keyFactory'
import type { QueryResponse, MutationResponse } from 'utils/queryClient/types'

const categoriesKeySet = new QueryKeySet('Category')

/***** Get categories *****/
const getCategories = () => axios.get<QueryResponse<{ categories: Category[] }>>('/category')
export const categoriesQueryKey = categoriesKeySet.many

export function useGetCategoriesQuery() {
    return useQuery({
        queryKey: categoriesQueryKey(),
        queryFn: getCategories,
        select: (res) => res.data.data.categories
    })
}

/***** Create category *****/
const createCategory = (newCategory: NewCategory) => axios.post<MutationResponse>('/category', newCategory)

export function useCreateCategoryMutation() {
    return useMutation({
        mutationFn: createCategory
    })
}

/***** Delete category *****/
const deleteCategory = (id: string) => axios.delete<MutationResponse>(`/category/${id}`)

export function useDeleteCategoryMutation() {
    return useMutation({
        mutationFn: deleteCategory
    })
}
