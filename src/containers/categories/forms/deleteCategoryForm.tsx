import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { categoriesQueryKey, useDeleteCategoryMutation } from '../queries'
import { useGetCategoriesQuery } from '../queries'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import { queryClient } from 'utils/queryClient'

function DeleteCategoryForm() {
    const navigate = useNavigate()
    const { categoryId } = useParams()

    const { data: getCategoriesData } = useGetCategoriesQuery()

    const category = getCategoriesData?.find((currentCategory) => currentCategory.id.toString() === categoryId)

    const { mutate: deleteCategory, isLoading: isDeleteCategoryLoading } = useDeleteCategoryMutation()

    return (
        <div>
            <UrlModal title='Delete Category' desc={category?.name} onClose={() => navigate(-1)}>
                <>
                    <ModalBody>Are you sure you want to delete this category?</ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <Button
                                key={2}
                                color='error'
                                loading={isDeleteCategoryLoading}
                                disabled={isDeleteCategoryLoading}
                                onClick={() => {
                                    deleteCategory(categoryId || '', {
                                        onSuccess: (res) => {
                                            toast.success(res.message)
                                            queryClient.invalidateQueries(categoriesQueryKey())
                                        },
                                        onSettled: () => navigate(-1)
                                    })
                                }}
                            >
                                Delete
                            </Button>
                        ]}
                    />
                </>
            </UrlModal>
        </div>
    )
}

export default DeleteCategoryForm
