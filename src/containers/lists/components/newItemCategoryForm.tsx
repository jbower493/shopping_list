import React from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import Modal from 'components/Modal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import SubmitButton from 'components/Form/SubmitButton'
import SelectField from 'components/Form/Inputs/SelectField'
import { useGetCategoriesQuery } from 'containers/categories/queries'
import { getCategoryOptions } from 'utils/functions'
import FormRow from 'components/Form/FormRow'

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
    const { data: getCategoriesData, isFetching: isGetCategoriesFetching, isError: isGetCategoriesError } = useGetCategoriesQuery()

    const methods = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async ({ categoryId }) => {
        onSubmitFunc(categoryId)
    }

    const renderForm = () => {
        if (isGetCategoriesError || !getCategoriesData) return <h3>Error fetching categories</h3>

        return (
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormRow>
                            <SelectField.HookForm label='Category' name='categoryId' options={getCategoryOptions(getCategoriesData)} />
                        </FormRow>
                    </ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => close()}>
                                Back
                            </Button>,
                            <SubmitButton
                                key={2}
                                isSubmitting={methods.formState.isSubmitting}
                                isValid={methods.formState.isValid}
                                isDirty={true}
                                text='Add Item'
                            />
                        ]}
                    />
                </form>
            </FormProvider>
        )
    }

    return (
        <div>
            <Modal
                open={isOpen}
                title='Categorize New Item'
                desc={`This is a new item. Please choose a category for "${itemName}".`}
                onClose={() => close()}
                loading={isGetCategoriesFetching}
            >
                {renderForm()}
            </Modal>
        </div>
    )
}

export default NewItemCategoryForm
