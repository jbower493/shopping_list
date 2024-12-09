import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { queryClient } from 'utils/queryClient'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'
import { recipesQueryKey, useAcceptSharedRecipeMutation } from '../queries'
import { notificationsQueryKey, useNotificationsQuery } from 'components/Notifications/queries'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import { ShareRequest } from 'components/Notifications/types'

type Inputs = {
    name: string
}

const schema = z.object({
    name: z.string().min(1, 'Required')
})

function AcceptSharedRecipeForm() {
    const navigate = useNavigate()
    const { shareRequestId } = useParams()

    const { data: notificationsData } = useNotificationsQuery()
    const { mutateAsync: acceptSharedRecipe } = useAcceptSharedRecipeMutation()

    const shareRequests = notificationsData?.notifications.filter(({ type }) => type === 'share_request')?.map(({ meta }) => meta) as
        | ShareRequest[]
        | undefined
    const shareRequest = shareRequests?.find(({ share_request_id }) => share_request_id === Number(shareRequestId))

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            name: ''
        },
        values: {
            name: shareRequest?.recipe_name || ''
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
        await acceptSharedRecipe(
            { newRecipeName: name, shareRequestId: Number(shareRequestId) },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    queryClient.invalidateQueries(notificationsQueryKey())
                    queryClient.invalidateQueries(recipesQueryKey())
                    navigate(`/recipes/edit/${res.data?.new_recipe_id}`)
                }
            }
        )
    }

    return (
        <div>
            <UrlModal
                onClose={() => navigate('/recipes')}
                title='Accept Recipe'
                desc={`"${shareRequest?.recipe_name || ''}" from ${shareRequest?.owner_name || ''}`}
            >
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormRow>
                                <InputField.HookForm label='Save Recipe As' name='name' />
                            </FormRow>
                        </ModalBody>
                        <ModalFooter
                            buttons={[
                                <Button key={1} color='secondary' onClick={() => navigate('/recipes')}>
                                    Back
                                </Button>,
                                <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={true} text='Accept Recipe' />
                            ]}
                        />
                    </form>
                </FormProvider>
            </UrlModal>
        </div>
    )
}

export default AcceptSharedRecipeForm
