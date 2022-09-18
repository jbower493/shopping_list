import React from 'react'
import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { useCreateItemMutation } from 'utils/api/items'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'

type Inputs = {
    name: string
}

function AddItemForm() {
    const navigate = useNavigate()

    const [createItem] = useCreateItemMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isDirty, isValid, isSubmitting }
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
        try {
            const result = await createItem({ name }).unwrap()
            toast.success(result.message)
            navigate(-1)
        } catch (_) {
            navigate(-1)
        }
    }

    return (
        <div>
            <UrlModal title='New Item' desc='Enter a name for your new item.' onClose={() => navigate(-1)}>
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

export default AddItemForm
