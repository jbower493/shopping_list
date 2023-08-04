import React from 'react'
import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { menusQueryKey, useCreateMenuMutation } from '../queries'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { queryClient } from 'utils/queryClient'

type Inputs = {
    name: string
}

function AddMenuForm() {
    const navigate = useNavigate()

    const { mutateAsync: createMenu } = useCreateMenuMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isDirty, isValid, isSubmitting }
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
        await createMenu(
            { name },
            {
                onSuccess: (res) => {
                    toast.success(res.data.message)
                    queryClient.invalidateQueries(menusQueryKey())
                },
                onSettled: () => navigate(-1)
            }
        )
    }

    return (
        <div>
            <UrlModal title='New Menu' desc='Enter a name for your new menu.' onClose={() => navigate(-1)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <InputField<Inputs>
                            label='Name'
                            name='name'
                            type='text'
                            register={register}
                            validation={{ required: 'This is required.' }}
                            error={touchedFields.name && errors.name}
                        />
                    </ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Create' />
                        ]}
                    />
                </form>
            </UrlModal>
        </div>
    )
}

export default AddMenuForm
