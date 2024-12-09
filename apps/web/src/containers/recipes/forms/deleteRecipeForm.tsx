import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { recipesQueryKey, useDeleteRecipeMutation } from 'containers/recipes/queries'
import { useGetRecipesQuery } from 'containers/recipes/queries'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import { queryClient } from 'utils/queryClient'

function DeleteRecipeForm() {
    const navigate = useNavigate()
    const { recipeId } = useParams()

    const { data: getRecipesData } = useGetRecipesQuery()

    const recipe = getRecipesData?.find((currentRecipe) => currentRecipe.id.toString() === recipeId)

    const { mutate: deleteRecipe, isLoading: isDeleteRecipeLoading } = useDeleteRecipeMutation()

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
                                loading={isDeleteRecipeLoading}
                                disabled={isDeleteRecipeLoading}
                                onClick={() => {
                                    deleteRecipe(recipeId || '', {
                                        onSuccess: (res) => {
                                            toast.success(res.message)
                                            queryClient.invalidateQueries(recipesQueryKey())
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

export default DeleteRecipeForm
