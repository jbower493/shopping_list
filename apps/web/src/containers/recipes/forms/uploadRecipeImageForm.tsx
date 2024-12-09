import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { singleRecipeQueryKey, useGetSingleRecipeQuery, useUploadRecipeImageMutation } from '../queries'
import SubmitButton from 'components/Form/SubmitButton'
import { queryClient } from 'utils/queryClient'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'

type Inputs = {
    recipe_image: string
}

const schema = z.object({
    recipe_image: z.string()
})

export function UploadRecipeImageForm() {
    const navigate = useNavigate()

    const { recipeId } = useParams()

    const { data: singleRecipeData, isFetching: isSingleRecipeFetching } = useGetSingleRecipeQuery(recipeId || '')

    const { mutateAsync: uploadRecipeImage } = useUploadRecipeImageMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            recipe_image: ''
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async () => {
        const fileInput = document.getElementById('recipeImage') as HTMLInputElement
        const file = fileInput?.files?.[0]

        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append('recipe_image', file)

        await uploadRecipeImage(
            { id: singleRecipeData?.id.toString() || '', formData },
            {
                onSuccess(res) {
                    toast.success(res.message)
                    queryClient.invalidateQueries(singleRecipeQueryKey(singleRecipeData?.id.toString() || ''))
                    navigate(`/recipes/edit/${singleRecipeData?.id.toString()}`)
                }
            }
        )
    }

    return (
        <div>
            <UrlModal title='Upload Recipe Image' desc={singleRecipeData?.name} onClose={() => navigate(-1)} loading={isSingleRecipeFetching}>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            {singleRecipeData?.image_url ? (
                                <p className='mb-4'>
                                    <strong>Warning</strong>: Uploading a new image for this recipe will permanently remove the current recipe image.
                                </p>
                            ) : null}
                            <FormRow>
                                <input id='recipeImage' type='file' name='recipe_image' />
                            </FormRow>
                        </ModalBody>
                        <ModalFooter
                            buttons={[
                                <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                    Back
                                </Button>,
                                <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={true} text='Upload Image' />
                            ]}
                        />
                    </form>
                </FormProvider>
            </UrlModal>
        </div>
    )
}
