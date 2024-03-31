import { Link } from 'react-router-dom'
import { useLoginMutation } from 'containers/auth/queries'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { toast } from 'react-hot-toast'
import { queryClient } from 'utils/queryClient'
import { userQueryKey } from 'utils/queryClient/keyFactory'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Inputs = {
    email: string
    password: string
}

const schema = z.object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required')
})

function LoginForm() {
    const { mutateAsync: login } = useLoginMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting, isDirty }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await login(data, {
            onSuccess: (res) => {
                toast.success(res.message)
                queryClient.invalidateQueries(userQueryKey)
            }
        })
    }

    return (
        <div className='flex items-center h-full h-[-webkit-fill-available] p-4'>
            <FormProvider {...methods}>
                <form className='max-w-xs w-full mx-auto p-3 border border-primary rounded' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='text-center mb-2'>Login</h2>
                    <InputField.HookForm label='Email' name='email' type='email' />
                    <InputField.HookForm label='Password' name='password' type='password' />
                    <SubmitButton isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Login' fullWidth />
                    <Link className='mt-3 w-fit block' to='/register'>
                        Register
                    </Link>
                    <Link className='mt-1 w-fit block' to='/forgot-password'>
                        Forgot Password
                    </Link>
                </form>
            </FormProvider>
        </div>
    )
}

export default LoginForm
