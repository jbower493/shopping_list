import React from 'react'
import { Link } from 'react-router-dom'
import { useLoginMutation } from 'utils/api/auth'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import { toast } from 'react-hot-toast'
import SubmitButton from 'components/Form/SubmitButton'

type Inputs = {
    email: string
    password: string
}

function LoginForm() {
    const [login] = useLoginMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields, isSubmitting, isDirty }
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const result = await login(data).unwrap()

        toast.success(result.message)
    }

    return (
        <div className='flex items-center h-full h-[-webkit-fill-available] p-4'>
            <form className='max-w-xs w-full mx-auto p-3 border border-primary rounded' onSubmit={handleSubmit(onSubmit)}>
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
                <Link className='mt-3 inline-block' to='/register'>
                    Register
                </Link>
            </form>
        </div>
    )
}

export default LoginForm
