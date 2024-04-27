import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
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
import FormRow from 'components/Form/FormRow'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Inputs = {
    recipeCategoryId: string | undefined
    recipeId: string
}

const schema = z.object({
    recipeCategoryId: z.string(),
    recipeId: z.string()
})

function AddFromRecipeForm() {
    const navigate = useNavigate()
    const { listId } = useParams()

    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()
    const { data: getRecipeCategoriesData, isFetching: isGetRecipeCategoriesFetching } = useGetRecipeCategoriesQuery()

    const { mutateAsync: addItemsFromRecipe } = useAddItemsFromRecipeMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            recipeCategoryId: 'ALL_CATEGORIES',
            recipeId: getRecipesData?.[0]?.id.toString()
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting },
        watch,
        setValue
    } = methods

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
        function getInitialRecipeIdValue() {
            if (selectedRecipeCategoryId === 'ALL_CATEGORIES') {
                return getRecipesData?.[0]?.id.toString() || ''
            }

            if (selectedRecipeCategoryId === 'none') {
                return getRecipesData?.find(({ recipe_category }) => !recipe_category)?.id.toString() || ''
            }

            return (
                getRecipesData?.find(({ recipe_category }) => recipe_category?.id?.toString() === selectedRecipeCategoryId || '')?.id.toString() || ''
            )
        }

        setValue('recipeId', getInitialRecipeIdValue())
    }, [selectedRecipeCategoryId])

    const renderForm = () => {
        if (isGetRecipesError) return <h2>Error fetching recipes!</h2>
        if (!getRecipesData) return ''

        return (
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormRow>
                            <SelectField.HookForm
                                label='Recipe Category'
                                name='recipeCategoryId'
                                options={[{ label: 'All categories', value: 'ALL_CATEGORIES' }, ...getRecipeCategoryOptions(getRecipeCategoriesData)]}
                            />
                        </FormRow>
                        <FormRow>
                            <SelectField.HookForm
                                label='Recipe'
                                name='recipeId'
                                options={getFilteredRecipes(selectedRecipeCategoryId, getRecipesData)}
                            />
                        </FormRow>
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
            </FormProvider>
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
