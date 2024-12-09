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
import { getRecipeCategoryOptions } from 'utils/functions'
import FormRow from 'components/Form/FormRow'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Combobox } from 'components/Form/Inputs/Combobox'
import { getFilteredRecipes } from 'containers/menus/forms/addRecipeToMenuForm'

type Inputs = {
    recipeCategoryId: string | undefined
    recipeName: string
}

function AddFromRecipeForm() {
    const navigate = useNavigate()
    const { listId } = useParams()

    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()
    const { data: getRecipeCategoriesData, isFetching: isGetRecipeCategoriesFetching } = useGetRecipeCategoriesQuery()

    const { mutateAsync: addItemsFromRecipe } = useAddItemsFromRecipeMutation()

    const allowedRecipeNames = getRecipesData?.map((recipe) => recipe.name) || []

    const schema = z.object({
        recipeCategoryId: z.string(),
        recipeName: z.string().refine((val) => allowedRecipeNames.includes(val), { message: 'Must be one of your existing recipes.' })
    })

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            recipeCategoryId: 'ALL_CATEGORIES',
            recipeName: ''
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting },
        watch
    } = methods

    const selectedRecipeCategoryId = watch('recipeCategoryId')

    const onSubmit: SubmitHandler<Inputs> = async ({ recipeName }) => {
        const recipeIdToAdd = getRecipesData?.find((recipe) => recipe.name === recipeName)?.id.toString() || ''

        await addItemsFromRecipe(
            { listId: listId || '', recipeId: recipeIdToAdd },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    queryClient.removeQueries(singleListQueryKey(listId || ''))
                },
                onSettled: () => navigate(-1)
            }
        )
    }

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
                        <FormRow className='mb-40'>
                            <Combobox.HookForm
                                className='w-full'
                                listClassName='max-h-40'
                                label='Recipe'
                                name='recipeName'
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
