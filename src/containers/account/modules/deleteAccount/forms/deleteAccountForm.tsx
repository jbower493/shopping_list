import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { useDeleteAccountMutation } from '../../../queries'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { queryClient } from 'utils/queryClient'
import FormRow from 'components/Form/FormRow'
import { userQueryKey } from 'utils/queryClient/keyFactory'
import { useGetUserQuery } from 'containers/auth/queries'

type Inputs = {
    confirm_email: string
}

export function DeleteAccountForm() {
    const navigate = useNavigate()

    const { data: getUserData } = useGetUserQuery()

    const { mutateAsync: deleteAccount } = useDeleteAccountMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        defaultValues: {
            confirm_email: ''
        }
    })

    const {
        handleSubmit,
        formState: { isDirty, isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async () => {
        await deleteAccount(
            { userId: getUserData?.user.id?.toString() || '' },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    queryClient.invalidateQueries(userQueryKey)
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
                            <InputField.HookForm<Inputs['confirm_email']>
                                label='Account Email Address'
                                name='confirm_email'
                                validate={(value) => {
                                    return value === getUserData?.user.email
                                }}
                            />
                        </FormRow>
                    </ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Go Back
                            </Button>,
                            <SubmitButton
                                key={2}
                                color='error'
                                isSubmitting={isSubmitting}
                                isValid={isValid}
                                isDirty={isDirty}
                                text='Delete Account'
                            />
                        ]}
                    />
                </form>
            </FormProvider>
        )
    }

    return (
        <div>
            <UrlModal
                title='Delete Account'
                desc='Please type the email address associated with the account to confirm you would like to delete the account.'
                onClose={() => navigate(-1)}
            >
                {renderForm()}
            </UrlModal>
        </div>
    )
}
