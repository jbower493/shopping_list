import React from 'react'
import { Link } from 'react-router-dom'
import { useRequestPasswordResetMutation } from 'utils/api/auth'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import { toast } from 'react-hot-toast'
import SubmitButton from 'components/Form/SubmitButton'

type Inputs = {
    email: string
}

function RequestPasswordReset() {
    const [requestReset] = useRequestPasswordResetMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty, touchedFields }
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const result = await requestReset(data).unwrap()
        toast.success(result.message)
    }

    return (
        <div className='flex items-center h-full h-[-webkit-fill-available] p-4'>
            <form className='max-w-xs w-full mx-auto p-3 border border-primary rounded' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-center mb-2 '>Request Password Reset</h2>
                <InputField<Inputs>
                    label='Email'
                    name='email'
                    type='email'
                    register={register}
                    validation={{ required: 'This is required.' }}
                    error={touchedFields.email && errors.email}
                />
                <SubmitButton isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Send Reset Email' fullWidth />
                <Link className='mt-3 inline-block' to='/login'>
                    Back to Login
                </Link>
            </form>
        </div>
    )
}

export default RequestPasswordReset
