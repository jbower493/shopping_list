import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from 'utils/api/auth'
import Button from 'components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import Loader from 'components/Loader'
import { toast } from 'react-hot-toast'

type Inputs = {
    name: string
    email: string
    password: string
}

function RegisterForm() {
    const navigate = useNavigate()

    const [registerUser, { isLoading }] = useRegisterMutation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        mode: 'onTouched'
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        registerUser(data)
            .unwrap()
            .then((result) => {
                toast.success(result.message)
                navigate('/login')
            })
    }

    if (isLoading) return <Loader fullPage />

    return (
        <div className='flex items-center h-full'>
            <form className='max-w-xs w-full mx-auto p-3 border border-emerald-500 rounded' onSubmit={handleSubmit(onSubmit)}>
                <InputField<Inputs>
                    label='Name'
                    name='name'
                    type='text'
                    register={register}
                    validation={{ required: 'This is required.' }}
                    error={errors.name}
                />
                <InputField<Inputs>
                    label='Email'
                    name='email'
                    type='email'
                    register={register}
                    validation={{ required: 'This is required.' }}
                    error={errors.email}
                />
                <InputField<Inputs>
                    label='Password'
                    name='password'
                    type='password'
                    register={register}
                    validation={{ required: 'This is required too.' }}
                    error={errors.password}
                />
                <div>
                    <Button className='w-full mb-3' type='submit'>
                        Register
                    </Button>
                </div>
                <div>
                    <Link to='/login'>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
