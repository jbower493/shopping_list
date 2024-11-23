import { Link, useSearchParams } from 'react-router-dom'
import { useLoginMutation } from 'containers/auth/queries'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { toast } from 'react-hot-toast'
import { queryClient } from 'utils/queryClient'
import { userQueryKey } from 'utils/queryClient/keyFactory'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'
import { FullScreenPage } from 'components/FullScreenPage'
import { useEffect } from 'react'
import { baseUrl } from 'config'

type Inputs = {
    email: string
    password: string
}

const schema = z.object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required')
})

function LoginForm() {
    // Prefill user email when its a recipe share request link
    const [searchParams] = useSearchParams()
    const recipientEmail = searchParams.get('recipient-email')

    const { mutateAsync: login } = useLoginMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            email: recipientEmail || '',
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

    useEffect(() => {
        if (recipientEmail) {
            toast.success('Login to accept shared recipe. You will be prompted to accept the share request after loggin in.')
        }
    }, [])

    return (
        <FullScreenPage>
            <div className='flex items-center h-full p-4'>
                <FormProvider {...methods}>
                    <form className='max-w-xs w-full mx-auto p-3 border border-primary rounded' onSubmit={handleSubmit(onSubmit)}>
                        <h2 className='text-center mb-2'>Login</h2>
                        <div className='flex items-center gap-4 mt-4'>
                            <p>Login with:</p>
                            <a href={`${baseUrl}/auth/google/redirect`}>
                                <img src='/google-sso/web_light_sq_na.svg' alt='Signin with Google' />
                            </a>
                        </div>
                        <div className='flex gap-3 items-center my-2'>
                            <span className='h-[1px] flex-1 bg-slate-200' />
                            <p className='text-slate-400'>OR</p>
                            <span className='h-[1px] flex-1 bg-slate-200' />
                        </div>
                        <FormRow>
                            <InputField.HookForm label='Email' name='email' type='email' />
                        </FormRow>
                        <FormRow>
                            <InputField.HookForm label='Password' name='password' type='password' />
                        </FormRow>
                        <SubmitButton isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Login' fullWidth />
                        <p className='mt-6'>
                            Don&apos;t have an account? <Link to='/register'>Register</Link>
                        </p>
                        <Link className='mt-1 w-fit block' to='/forgot-password'>
                            Forgot Password
                        </Link>
                    </form>
                </FormProvider>
            </div>
        </FullScreenPage>
    )
}

export default LoginForm
