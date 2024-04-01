import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useResetPasswordMutation } from '../queries'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import { toast } from 'react-hot-toast'
import SubmitButton from 'components/Form/SubmitButton'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'

type Inputs = {
    email: string
    password: string
    password_confirmation: string
}

const schema = z.object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
    password_confirmation: z.string().min(1, 'Required')
})

function RequestPasswordReset() {
    const navigate = useNavigate()
    const { token } = useParams()
    const [searchParams] = useSearchParams()

    const { mutateAsync: resetPassword } = useResetPasswordMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            email: searchParams.get('email') || '',
            password: '',
            password_confirmation: ''
        }
    })

    const {
        handleSubmit,
        formState: { isSubmitting, isValid, isDirty }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await resetPassword(
            { ...data, token: token || '' },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    navigate('/login')
                }
            }
        )
    }

    return (
        <div className='flex items-center h-full h-[-webkit-fill-available] p-4'>
            <FormProvider {...methods}>
                <form className='max-w-xs w-full mx-auto p-3 border border-primary rounded' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='text-center mb-2 '>Reset Password</h2>
                    <FormRow>
                        <InputField.HookForm label='Email' name='email' type='email' />
                    </FormRow>
                    <FormRow>
                        <InputField.HookForm label='New Password' name='password' type='password' />
                    </FormRow>
                    <FormRow>
                        <InputField.HookForm label='Confirm Password' name='password_confirmation' type='password' />
                    </FormRow>
                    <SubmitButton isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Reset Password' fullWidth />
                    <Link className='mt-3 inline-block' to='/login'>
                        Back to Login
                    </Link>
                </form>
            </FormProvider>
        </div>
    )
}

export default RequestPasswordReset
