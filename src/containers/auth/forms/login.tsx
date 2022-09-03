import React from 'react'
import { Link } from 'react-router-dom'
import { useLoginMutation } from 'utils/api/auth'
import Button from 'components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import Loader from 'components/Loader'

type Inputs = {
    email: string
    password: string
}

function LoginForm() {
    const [login, { isLoading }] = useLoginMutation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        mode: 'onTouched'
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        login(data)
            .then((result) => console.log(result))
            .catch((error) => console.log(error))
    }

    if (isLoading) return <Loader fullPage />

    return (
        <div className='flex items-center h-full'>
            <form className='max-w-xs w-full mx-auto p-3 border border-emerald-500 rounded' onSubmit={handleSubmit(onSubmit)}>
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
                        Login
                    </Button>
                </div>
                <div>
                    <Link to='/register'>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
