import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
    email: string
}

function LoginForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email', { required: true })} />
            <input type='submit' />
        </form>
    )
}

export default LoginForm
