import React from 'react'
import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { recipesQueryKey, useCreateRecipeMutation } from '../queries'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { queryClient } from 'utils/queryClient'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'
import SelectField from 'components/Form/Inputs/SelectField'
import { getRecipeCategoryOptions } from 'utils/functions'

type Inputs = {
    name: string
    recipeCategoryId: string
}

function AddRecipeForm() {
    const navigate = useNavigate()

    const {
        data: getRecipeCategoriesData,
        isFetching: isGetRecipeCategoriesFetching,
        isError: isGetRecipeCategoriesError
    } = useGetRecipeCategoriesQuery()

    const { mutateAsync: createRecipe } = useCreateRecipeMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isDirty, isValid, isSubmitting }
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = async ({ name, recipeCategoryId }) => {
        await createRecipe(
            { name, recipe_category_id: recipeCategoryId === 'none' ? null : Number(recipeCategoryId) },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    queryClient.invalidateQueries(recipesQueryKey())
                },
                onSettled: () => navigate(-1)
            }
        )
    }

    const renderForm = () => {
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
                        label='Recipe Category'
                        name='recipeCategoryId'
                        options={getRecipeCategoryOptions(getRecipeCategoriesData)}
                        register={register}
                        validation={{ required: 'This is required.' }}
                        error={touchedFields.recipeCategoryId && errors.recipeCategoryId}
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
            <UrlModal
                title='New Recipe'
                desc='Enter a name for your new recipe.'
                onClose={() => navigate(-1)}
                loading={isGetRecipeCategoriesFetching}
            >
                {renderForm()}
            </UrlModal>
        </div>
    )
}

export default AddRecipeForm
