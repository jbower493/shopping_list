import React from 'react'
import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { recipesQueryKey, useEditRecipeMutation, useGetSingleRecipeQuery } from '../queries'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { queryClient } from 'utils/queryClient'
import TextAreaField from 'components/Form/Inputs/TextAreaField'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'
import SelectField from 'components/Form/Inputs/SelectField'
import { getRecipeCategoryOptions } from 'utils/functions'
import { menusQueryKey } from 'containers/menus/queries'

type Inputs = {
    name: string
    instructions?: string
    recipeCategoryId: string
}

function EditRecipeDetailsForm() {
    const navigate = useNavigate()
    const { recipeId } = useParams()

    const { data: getRecipeCategoriesData } = useGetRecipeCategoriesQuery()

    const { data: getSingleRecipeData } = useGetSingleRecipeQuery(recipeId || '')

    const { mutateAsync: editRecipe } = useEditRecipeMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isDirty, isValid, isSubmitting }
    } = useForm<Inputs>({
        mode: 'onChange',
        defaultValues: {
            name: getSingleRecipeData?.name,
            instructions: getSingleRecipeData?.instructions || undefined
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async ({ name, instructions, recipeCategoryId }) => {
        await editRecipe(
            {
                recipeId: recipeId || '',
                attributes: {
                    name,
                    instructions,
                    recipe_category_id: recipeCategoryId === 'none' ? null : Number(recipeCategoryId)
                }
            },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    queryClient.invalidateQueries(recipesQueryKey())
                    queryClient.invalidateQueries(menusQueryKey())
                    navigate(-1)
                }
            }
        )
    }

    return (
        <div>
            <UrlModal title='Edit Recipe' desc='Update the name or instructions of your recipe' onClose={() => navigate(-1)}>
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
                        <TextAreaField<Inputs>
                            label='Instructions'
                            name='instructions'
                            register={register}
                            error={touchedFields.name && errors.name}
                        />
                    </ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Save' />
                        ]}
                    />
                </form>
            </UrlModal>
        </div>
    )
}

export default EditRecipeDetailsForm
