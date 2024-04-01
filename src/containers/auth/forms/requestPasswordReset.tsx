import { Link } from 'react-router-dom'
import { useRequestPasswordResetMutation } from '../queries'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import InputField from 'components/Form/Inputs/InputField'
import { toast } from 'react-hot-toast'
import SubmitButton from 'components/Form/SubmitButton'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'

type Inputs = {
    email: string
}

const schema = z.object({
    email: z.string().min(1, 'Required')
})

function RequestPasswordReset() {
    const { mutateAsync: requestPasswordReset } = useRequestPasswordResetMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            email: ''
        }
    })

    const {
        handleSubmit,
        formState: { isSubmitting, isValid, isDirty }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await requestPasswordReset(data, { onSuccess: (res) => toast.success(res.message) })
    }

    return (
        <div className='flex items-center h-full h-[-webkit-fill-available] p-4'>
            <FormProvider {...methods}>
                <form className='max-w-xs w-full mx-auto p-3 border border-primary rounded' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='text-center mb-2 '>Request Password Reset</h2>
                    <FormRow>
                        <InputField.HookForm label='Email' name='email' type='email' />
                    </FormRow>
                    <SubmitButton isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Send Reset Email' fullWidth />
                    <Link className='mt-3 inline-block' to='/login'>
                        Back to Login
                    </Link>
                </form>
            </FormProvider>
        </div>
    )
}

export default RequestPasswordReset
