import React from 'react'
import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { useAddItemsFromMenuMutation } from 'utils/api/lists'
import SelectField from 'components/Form/Inputs/SelectField'
import SubmitButton from 'components/Form/SubmitButton'
import { useGetMenusQuery } from 'utils/api/menus'

type Inputs = {
    menuId: string
}

function AddFromMenuForm() {
    const navigate = useNavigate()
    const { listId } = useParams()

    const { data, isFetching, isError } = useGetMenusQuery()
    const [addFromMenu] = useAddItemsFromMenuMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitting }
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async ({ menuId }) => {
        try {
            const result = await addFromMenu({ listId: listId || '', menuId }).unwrap()
            toast.success(result.message)
            navigate(-1)
        } catch (_) {
            navigate(-1)
        }
    }

    const renderForm = () => {
        if (isError) return <h2>Error fetching menus!</h2>
        if (!data) return ''

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <SelectField<Inputs>
                        label='Menu'
                        name='menuId'
                        options={data.map(({ id, name }) => ({
                            label: name,
                            value: id.toString()
                        }))}
                        register={register}
                        validation={{ required: 'This is required.' }}
                        error={touchedFields.menuId && errors.menuId}
                    />
                </ModalBody>
                <ModalFooter
                    buttons={[
                        <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                            Back
                        </Button>,
                        <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={true} text='Add All To List' />
                    ]}
                />
            </form>
        )
    }

    return (
        <div>
            <UrlModal
                title='Add From Menu'
                desc='Choose a menu to add items from. This will add every item from every recipe in your menu to the current list.'
                onClose={() => navigate(-1)}
                loading={isFetching}
            >
                <>{renderForm()}</>
            </UrlModal>
        </div>
    )
}

export default AddFromMenuForm
