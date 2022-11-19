import React from 'react'
import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { useAddItemsFromRecipeMutation } from 'utils/api/lists'
import SelectField from 'components/Form/Inputs/SelectField'
import SubmitButton from 'components/Form/SubmitButton'
import { useGetRecipesQuery } from 'utils/api/recipes'

type Inputs = {
    recipeId: string
}

function AddFromRecipeForm() {
    const navigate = useNavigate()
    const { listId } = useParams()

    const { data, isFetching, isError } = useGetRecipesQuery()
    const [addFromRecipe] = useAddItemsFromRecipeMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitting }
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async ({ recipeId }) => {
        try {
            const result = await addFromRecipe({ listId: listId || '', recipeId }).unwrap()
            toast.success(result.message)
            navigate(-1)
        } catch (_) {
            navigate(-1)
        }
    }

    const renderForm = () => {
        if (isError) return <h2>Error fetching recipes!</h2>
        if (!data) return ''

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <SelectField<Inputs>
                        label='Recipe'
                        name='recipeId'
                        options={data.map(({ id, name }) => ({
                            label: name,
                            value: id.toString()
                        }))}
                        register={register}
                        validation={{ required: 'This is required.' }}
                        error={touchedFields.recipeId && errors.recipeId}
                    />
                </ModalBody>
                <ModalFooter
                    buttons={[
                        <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                            Back
                        </Button>,
                        <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={true} text='Add To List' />
                    ]}
                />
            </form>
        )
    }

    return (
        <div>
            <UrlModal
                title='Add From Recipe'
                desc='Choose a recipe to add items from. This will add every item in your recipe to the current list.'
                onClose={() => navigate(-1)}
                loading={isFetching}
            >
                <>{renderForm()}</>
            </UrlModal>
        </div>
    )
}

export default AddFromRecipeForm
