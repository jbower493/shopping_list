import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Modal from 'components/Modal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import SubmitButton from 'components/Form/SubmitButton'
import SelectField from 'components/Form/Inputs/SelectField'
import { useGetCategoriesQuery } from 'utils/api/categories'
import { getCategoryOptions } from 'utils/functions'

type Inputs = {
    categoryId: string
}

interface NewItemCategoryFormProps {
    onSubmitFunc: (categoryId: string) => void
    isOpen: boolean
    close: () => void
    itemName: string
}

function NewItemCategoryForm({ onSubmitFunc, isOpen, close, itemName }: NewItemCategoryFormProps) {
    const { data, isFetching, isError } = useGetCategoriesQuery()

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitting }
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async ({ categoryId }) => {
        onSubmitFunc(categoryId)
    }

    const renderForm = () => {
        if (isError || !data) return <h3>Error fetching categories</h3>

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
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
                        <Button key={1} color='secondary' onClick={() => close()}>
                            Back
                        </Button>,
                        <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={true} text='Add Item' />
                    ]}
                />
            </form>
        )
    }

    return (
        <div>
            <Modal
                open={isOpen}
                title='Categorize New Item'
                desc={`This is a new item. Please choose a category for "${itemName}".`}
                onClose={() => close()}
                loading={isFetching}
            >
                {renderForm()}
            </Modal>
        </div>
    )
}

export default NewItemCategoryForm
