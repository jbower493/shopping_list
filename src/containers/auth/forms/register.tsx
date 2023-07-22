import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from 'containers/auth/queries'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import { toast } from 'react-hot-toast'
import SubmitButton from 'components/Form/SubmitButton'

type Inputs = {
    name: string
    email: string
    password: string
}

function RegisterForm() {
    const navigate = useNavigate()

    const { mutateAsync: registerUser } = useRegisterMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty, touchedFields }
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await registerUser(data, {
            onSuccess: (res) => {
                toast.success(res.data.message)
                navigate('/login')
            }
        })
    }

    return (
        <div className='flex items-center h-full h-[-webkit-fill-available] p-4'>
            <form className='max-w-xs w-full mx-auto p-3 border border-primary rounded' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-center mb-2 '>Register</h2>
                <InputField<Inputs>
                    label='Name'
                    name='name'
                    type='text'
                    register={register}
                    validation={{ required: 'This is required.' }}
                    error={touchedFields.name && errors.name}
                />
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
                <SubmitButton isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Register' fullWidth />
                <Link className='mt-3 inline-block' to='/login'>
                    Login
                </Link>
            </form>
        </div>
    )
}

export default RegisterForm
