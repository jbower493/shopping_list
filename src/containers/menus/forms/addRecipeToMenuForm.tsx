import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import SelectField from 'components/Form/Inputs/SelectField'
import SubmitButton from 'components/Form/SubmitButton'
import { useGetRecipesQuery } from 'containers/recipes/queries'
import { queryClient } from 'utils/queryClient'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'
import { getRecipeCategoryOptions } from 'utils/functions'
import { singleMenuQueryKey, useAddRecipeToMenuMutation } from '../queries'
import { Recipe } from 'containers/recipes/types'

export function getFilteredRecipes(selectedRecipeCategoryId: string | undefined, getRecipesData: Recipe[]) {
    function filterFn({ recipe_category }: Recipe) {
        if (selectedRecipeCategoryId === 'ALL_CATEGORIES') {
            return true
        }

        if (recipe_category?.id === Number(selectedRecipeCategoryId)) {
            return true
        }

        if (!recipe_category && selectedRecipeCategoryId === 'none') {
            return true
        }

        return false
    }

    const list = (getRecipesData || []).filter(filterFn)

    return list.map(({ id, name }) => ({
        label: name,
        value: id.toString()
    }))
}

type Inputs = {
    recipeCategoryId: string | undefined
    recipeId: string
}

function AddRecipeToMenuForm() {
    const navigate = useNavigate()
    const { menuId } = useParams()

    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()
    const { data: getRecipeCategoriesData, isFetching: isGetRecipeCategoriesFetching } = useGetRecipeCategoriesQuery()

    const { mutateAsync: addRecipeToMenu } = useAddRecipeToMenuMutation()

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
        await addRecipeToMenu(
            { menuId: menuId || '', recipeId },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(singleMenuQueryKey(menuId || ''))
                    navigate(-1)
                }
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
                        <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={true} text='Add Recipe' />
                    ]}
                />
            </form>
        )
    }

    return (
        <div>
            <UrlModal
                title='Add Recipe To Menu'
                desc='Choose a recipe to add to this menu. Select a recipe category to show only the recipes from that category.'
                onClose={() => navigate(-1)}
                loading={isGetRecipesFetching || isGetRecipeCategoriesFetching}
            >
                <>{renderForm()}</>
            </UrlModal>
        </div>
    )
}

export default AddRecipeToMenuForm
