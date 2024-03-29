import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { singleListQueryKey, useAddItemsFromRecipeMutation } from '../queries'
import SelectField from 'components/Form/Inputs/SelectField'
import SubmitButton from 'components/Form/SubmitButton'
import { useGetRecipesQuery } from 'containers/recipes/queries'
import { queryClient } from 'utils/queryClient'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'
import { getFilteredRecipes } from 'containers/menus/forms/addRecipeToMenuForm'
import { getRecipeCategoryOptions } from 'utils/functions'

type Inputs = {
    recipeCategoryId: string | undefined
    recipeId: string
}

function AddFromRecipeForm() {
    const navigate = useNavigate()
    const { listId } = useParams()

    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()
    const { data: getRecipeCategoriesData, isFetching: isGetRecipeCategoriesFetching } = useGetRecipeCategoriesQuery()

    const { mutateAsync: addItemsFromRecipe } = useAddItemsFromRecipeMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitting },
        watch,
        resetField
    } = useForm<Inputs>({
        mode: 'onChange'
    })

    const selectedRecipeCategoryId = watch('recipeCategoryId')

    const onSubmit: SubmitHandler<Inputs> = async ({ recipeId }) => {
        await addItemsFromRecipe(
            { listId: listId || '', recipeId },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    queryClient.removeQueries(singleListQueryKey(listId || ''))
                },
                onSettled: () => navigate(-1)
            }
        )
    }

    useEffect(() => {
        resetField('recipeId')
    }, [selectedRecipeCategoryId])

    const renderForm = () => {
        if (isGetRecipesError) return <h2>Error fetching recipes!</h2>
        if (!getRecipesData) return ''

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <SelectField<Inputs>
                        label='Recipe Category'
                        name='recipeCategoryId'
                        options={[{ label: 'All categories', value: 'ALL_CATEGORIES' }, ...getRecipeCategoryOptions(getRecipeCategoriesData)]}
                        register={register}
                        error={touchedFields.recipeCategoryId && errors.recipeCategoryId}
                    />
                    <SelectField<Inputs>
                        label='Recipe'
                        name='recipeId'
                        options={getFilteredRecipes(selectedRecipeCategoryId, getRecipesData)}
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
                        <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={true} text='Add All To List' />
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
                loading={isGetRecipesFetching || isGetRecipeCategoriesFetching}
            >
                <>{renderForm()}</>
            </UrlModal>
        </div>
    )
}

export default AddFromRecipeForm
