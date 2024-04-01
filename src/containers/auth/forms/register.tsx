import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from 'containers/auth/queries'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import { toast } from 'react-hot-toast'
import SubmitButton from 'components/Form/SubmitButton'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'

type Inputs = {
    name: string
    email: string
    password: string
}

const schema = z.object({
    name: z.string().min(1, 'Required'),
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required')
})

function RegisterForm() {
    const navigate = useNavigate()

    const { mutateAsync: registerUser } = useRegisterMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const {
        handleSubmit,
        formState: { isSubmitting, isValid, isDirty }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await registerUser(data, {
            onSuccess: (res) => {
                toast.success(res.message)
                navigate('/login')
            }
        })
    }

    return (
        <div className='flex items-center h-full h-[-webkit-fill-available] p-4'>
            <FormProvider {...methods}>
                <form className='max-w-xs w-full mx-auto p-3 border border-primary rounded' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='text-center mb-2 '>Register</h2>
                    <FormRow>
                        <InputField.HookForm label='Name' name='name' />
                    </FormRow>
                    <FormRow>
                        <InputField.HookForm label='Email' name='email' type='email' />
                    </FormRow>
                    <FormRow>
                        <InputField.HookForm label='Password' name='password' type='password' />
                    </FormRow>
                    <SubmitButton isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Register' fullWidth />
                    <Link className='mt-3 inline-block' to='/login'>
                        Login
                    </Link>
                </form>
            </FormProvider>
        </div>
    )
}

export default RegisterForm
