import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { useChangePasswordMutation } from '../../../queries'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'

type Inputs = {
    new_password: string
    confirm_new_password: string
}

const schema = z
    .object({
        new_password: z.string().min(1, 'Required'),
        confirm_new_password: z.string().min(1, 'Required')
    })
    .refine((values) => values.new_password === values.confirm_new_password, {
        path: ['confirm_new_password'],
        message: 'Must match "New Password" field'
    })

export function ChangePasswordForm() {
    const navigate = useNavigate()

    const { mutateAsync: changePassword } = useChangePasswordMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            new_password: '',
            confirm_new_password: ''
        }
    })

    const {
        handleSubmit,
        formState: { isDirty, isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ new_password, confirm_new_password }) => {
        await changePassword(
            { new_password, confirm_new_password },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
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
                            <InputField.HookForm label='New Password' name='new_password' type='password' />
                        </FormRow>
                        <FormRow>
                            <InputField.HookForm label='Confirm New Password' name='confirm_new_password' type='password' />
                        </FormRow>
                    </ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Change Password' />
                        ]}
                    />
                </form>
            </FormProvider>
        )
    }

    return (
        <div>
            <UrlModal title='Change Password' desc='Enter the new password you would like to use for your account' onClose={() => navigate(-1)}>
                {renderForm()}
            </UrlModal>
        </div>
    )
}
