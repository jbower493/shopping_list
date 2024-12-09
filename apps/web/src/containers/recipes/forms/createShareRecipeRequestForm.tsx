import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'
import { useCreateShareRecipeRequestMutation, useGetSingleRecipeQuery } from '../queries'
import UrlModal from 'components/Modal/UrlModal'
import { useNavigate, useParams } from 'react-router-dom'

type Inputs = {
    email: string
}

const schema = z.object({
    email: z.string().min(1, 'Required')
})

function CreateShareRecipeRequestForm() {
    const { recipeId } = useParams()
    const navigate = useNavigate()

    const { data: singleRecipeData } = useGetSingleRecipeQuery(recipeId || '')
    const { mutateAsync: shareRecipe } = useCreateShareRecipeRequestMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            email: ''
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting, isDirty }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
        await shareRecipe(
            { email, recipeId: singleRecipeData?.id || -1 },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    navigate(-1)
                }
            }
        )
    }

    return (
        <div>
            <UrlModal title='Share Recipe' desc={singleRecipeData?.name} onClose={() => navigate(-1)}>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormRow>
                                <InputField.HookForm label='Email Address To Share With' name='email' />
                            </FormRow>
                        </ModalBody>
                        <ModalFooter
                            buttons={[
                                <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                    Back
                                </Button>,
                                <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Share Recipe' />
                            ]}
                        />
                    </form>
                </FormProvider>
            </UrlModal>
        </div>
    )
}

export default CreateShareRecipeRequestForm
