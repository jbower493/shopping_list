import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Category, NewCategory } from 'containers/categories/types'
import type { QueryResponse, MutationResponse } from 'utils/api/types'

/***** Get categories *****/
const getCategories = () => axios.get<QueryResponse<{ categories: Category[] }>>('/category')
export const getCategoriesKey = ['Categories']

export function useGetCategoriesQuery() {
    return useQuery({
        queryKey: getCategoriesKey,
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
