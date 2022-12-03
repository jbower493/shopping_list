import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { useDeleteCategoryMutation, useGetCategoriesQuery } from 'utils/api/categories'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'

function DeleteCategoryForm() {
    const navigate = useNavigate()
    const { categoryId } = useParams()

    const { category } = useGetCategoriesQuery(undefined, {
        selectFromResult: ({ data }) => ({ category: data?.find((currentCategory) => currentCategory.id.toString() === categoryId) })
    })
    const [deleteCategory, { isLoading }] = useDeleteCategoryMutation()

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
                                loading={isLoading}
                                disabled={isLoading}
                                onClick={() => {
                                    deleteCategory(categoryId || '')
                                        .unwrap()
                                        .then((result) => {
                                            toast.success(result.message)
                                        })
                                        .finally(() => navigate(-1))
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
