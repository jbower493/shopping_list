import React from 'react'
import { Link } from 'react-router-dom'
import { useLoginMutation, getUserKey } from 'containers/auth/queries'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { toast } from 'react-hot-toast'
import { queryClient } from 'utils/queryClient'

type Inputs = {
    email: string
    password: string
}

function LoginForm() {
    const { mutateAsync: login } = useLoginMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields, isSubmitting, isDirty }
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await login(data, {
            onSuccess: (res) => {
                toast.success(res.data.message)
                queryClient.invalidateQueries(getUserKey)
            }
        })
    }

    return (
        <div className='flex items-center h-full h-[-webkit-fill-available] p-4'>
            <form className='max-w-xs w-full mx-auto p-3 border border-primary rounded' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-center mb-2'>Login</h2>
                <InputField<Inputs>
                    label='Email'
                    name='email'
                    type='email'
                    register={register}
                    validation={{ required: 'This is required.' }}
                    error={touchedFields.email && errors.email}
                />
                <InputField<Inputs>
                    label='Password'
                    name='password'
                    type='password'
                    register={register}
                    validation={{ required: 'This is required too.' }}
                    error={touchedFields.password && errors.password}
                />
                <SubmitButton isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Login' fullWidth />
                <Link className='mt-3 w-fit block' to='/register'>
                    Register
                </Link>
                <Link className='mt-1 w-fit block' to='/forgot-password'>
                    Forgot Password
                </Link>
            </form>
        </div>
    )
}

export default LoginForm
