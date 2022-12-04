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
import SelectField from 'components/Form/Inputs/SelectField'
import { useGetCategoriesQuery } from 'utils/api/categories'
import { getCategoryOptions } from 'utils/functions'

type Inputs = {
    name: string
    categoryId: string
}

function AddItemForm() {
    const navigate = useNavigate()

    const { data, isFetching, isError } = useGetCategoriesQuery()

    const [createItem] = useCreateItemMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isDirty, isValid, isSubmitting }
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async ({ name, categoryId }) => {
        try {
            const result = await createItem({ name, category_id: categoryId === 'none' ? null : Number(categoryId) }).unwrap()
            toast.success(result.message)
            navigate(-1)
        } catch (_) {
            navigate(-1)
        }
    }

    const renderForm = () => {
        if (isError || !data) return <h3>Error fetching categories</h3>

        return (
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
                    <SelectField<Inputs>
                        label='Category'
                        name='categoryId'
                        options={getCategoryOptions(data)}
                        register={register}
                        validation={{ required: 'This is required.' }}
                        error={touchedFields.categoryId && errors.categoryId}
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
        )
    }

    return (
        <div>
            <UrlModal title='New Item' desc='Enter a name for your new item.' onClose={() => navigate(-1)} loading={isFetching}>
                {renderForm()}
            </UrlModal>
        </div>
    )
}

export default AddItemForm
