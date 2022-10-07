import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { useDeleteRecipeMutation, useGetRecipesQuery } from 'utils/api/recipes'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'

function DeleteRecipeForm() {
    const navigate = useNavigate()
    const { recipeId } = useParams()

    const { recipe } = useGetRecipesQuery(undefined, {
        selectFromResult: ({ data }) => ({ recipe: data?.find((currentRecipe) => currentRecipe.id.toString() === recipeId) })
    })
    const [deleteRecipe, { isLoading }] = useDeleteRecipeMutation()

    return (
        <div>
            <UrlModal title='Delete Recipe' desc={recipe?.name} onClose={() => navigate(-1)}>
                <>
                    <ModalBody>Are you sure you want to delete this recipe?</ModalBody>
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
                                    deleteRecipe(recipeId || '')
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

export default DeleteRecipeForm
