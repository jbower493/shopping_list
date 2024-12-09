import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { singleRecipeQueryKey, useGetSingleRecipeQuery, useRemoveRecipeImageMutation } from 'containers/recipes/queries'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import { queryClient } from 'utils/queryClient'

export function RemoveRecipeImageForm() {
    const navigate = useNavigate()
    const { recipeId } = useParams()

    const { data: singleRecipeData } = useGetSingleRecipeQuery(recipeId || '')

    const { mutate: removeRecipeImage, isLoading: isRemoveRecipeImageLoading } = useRemoveRecipeImageMutation()

    return (
        <div>
            <UrlModal title='Remove Recipe Image' desc={singleRecipeData?.name} onClose={() => navigate(-1)}>
                <>
                    <ModalBody>Are you sure you want to remove the image from this recipe? The image will be deleted permanently.</ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <Button
                                key={2}
                                color='error'
                                loading={isRemoveRecipeImageLoading}
                                disabled={isRemoveRecipeImageLoading}
                                onClick={() => {
                                    removeRecipeImage(recipeId || '', {
                                        onSuccess: (res) => {
                                            toast.success(res.message)
                                            queryClient.invalidateQueries(singleRecipeQueryKey(singleRecipeData?.id.toString() || ''))
                                            navigate(-1)
                                        }
                                    })
                                }}
                            >
                                Remove Image
                            </Button>
                        ]}
                    />
                </>
            </UrlModal>
        </div>
    )
}
