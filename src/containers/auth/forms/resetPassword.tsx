import React from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useResetPasswordMutation } from 'utils/api/auth'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import { toast } from 'react-hot-toast'
import SubmitButton from 'components/Form/SubmitButton'

type Inputs = {
    email: string
    password: string
    password_confirmation: string
}

function RequestPasswordReset() {
    const navigate = useNavigate()
    const { token } = useParams()
    const [searchParams] = useSearchParams()

    const [resetPassword] = useResetPasswordMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty, touchedFields }
    } = useForm<Inputs>({
        mode: 'onChange',
        defaultValues: {
            email: searchParams.get('email') || ''
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const result = await resetPassword({ ...data, token: token || '' }).unwrap()
        toast.success(result.message)
        navigate('/login')
    }

    return (
        <div className='flex items-center h-full h-[-webkit-fill-available] p-4'>
            <form className='max-w-xs w-full mx-auto p-3 border border-primary rounded' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-center mb-2 '>Reset Password</h2>
                <InputField<Inputs>
                    label='Email'
                    name='email'
                    type='email'
                    register={register}
                    validation={{ required: 'This is required.' }}
                    error={touchedFields.email && errors.email}
                />
                <InputField<Inputs>
                    label='New Password'
                    name='password'
                    type='password'
                    register={register}
                    validation={{ required: 'This is required too.' }}
                    error={touchedFields.password && errors.password}
                />
                <InputField<Inputs>
                    label='Confirm Password'
                    name='password_confirmation'
                    type='password'
                    register={register}
                    validation={{ required: 'This is required too.' }}
                    error={touchedFields.password && errors.password}
                />
                <SubmitButton isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Reset Password' fullWidth />
                <Link className='mt-3 inline-block' to='/login'>
                    Back to Login
                </Link>
            </form>
        </div>
    )
}

export default RequestPasswordReset
