import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { additionalUsersQueryKey, useAddAdditionalUserMutation } from '../../../queries'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { queryClient } from 'utils/queryClient'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'

type Inputs = {
    email: string
}

const schema = z.object({
    email: z.string().min(1, 'Required')
})

export function AddAdditionalUserForm() {
    const navigate = useNavigate()

    const { mutateAsync: addAdditionalUser } = useAddAdditionalUserMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            email: ''
        }
    })

    const {
        handleSubmit,
        formState: { isDirty, isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
        await addAdditionalUser(
            { additional_user_email: email },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    queryClient.invalidateQueries(additionalUsersQueryKey())
                    navigate(-1)
                }
            }
        )
    }

    const renderForm = () => {
        return (
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormRow>
                            <InputField.HookForm label='Email' name='email' />
                        </FormRow>
                    </ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Add' />
                        ]}
                    />
                </form>
            </FormProvider>
        )
    }

    return (
        <div>
            <UrlModal title='Add Additional User' desc='Enter the email address you want to give access to your account' onClose={() => navigate(-1)}>
                {renderForm()}
            </UrlModal>
        </div>
    )
}
