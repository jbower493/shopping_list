import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { recipeCategoriesQueryKey, useDeleteRecipeCategoryMutation } from '../queries'
import { useGetRecipeCategoriesQuery } from '../queries'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import { queryClient } from 'utils/queryClient'

function DeleteRecipeCategoryForm() {
    const navigate = useNavigate()
    const { recipeCategoryId } = useParams()

    const { data: getRecipeCategoriesData } = useGetRecipeCategoriesQuery()

    const category = getRecipeCategoriesData?.find((currentRecipeCategory) => currentRecipeCategory.id.toString() === recipeCategoryId)

    const { mutate: deleteRecipeCategory, isLoading: isDeleteRecipeCategoryLoading } = useDeleteRecipeCategoryMutation()

    return (
        <div>
            <UrlModal title='Delete Recipe Category' desc={category?.name} onClose={() => navigate(-1)}>
                <>
                    <ModalBody>Are you sure you want to delete this recipe category?</ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <Button
                                key={2}
                                color='error'
                                loading={isDeleteRecipeCategoryLoading}
                                disabled={isDeleteRecipeCategoryLoading}
                                onClick={() => {
                                    deleteRecipeCategory(recipeCategoryId || '', {
                                        onSuccess: (res) => {
                                            toast.success(res.message)
                                            queryClient.invalidateQueries(recipeCategoriesQueryKey())
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

export default DeleteRecipeCategoryForm
