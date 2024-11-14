import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import SelectField from 'components/Form/Inputs/SelectField'
import SubmitButton from 'components/Form/SubmitButton'
import { useGetRecipesQuery } from 'containers/recipes/queries'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'
import { getRecipeCategoryOptions } from 'utils/functions'
import { useAddRecipeToMenuMutation } from '../queries'
import { Recipe } from 'containers/recipes/types'
import FormRow from 'components/Form/FormRow'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getDayOptions } from '../editMenu/days'
import { Combobox } from 'components/Form/Inputs/Combobox'

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
        id,
        value: name
    }))
}

type Inputs = {
    recipeCategoryId: string | undefined
    recipeName: string
    day: string
}

function AddRecipeToMenuForm() {
    const navigate = useNavigate()
    const { menuId } = useParams()

    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()
    const { data: getRecipeCategoriesData, isFetching: isGetRecipeCategoriesFetching } = useGetRecipeCategoriesQuery()

    const { mutate: addRecipeToMenu } = useAddRecipeToMenuMutation()

    const allowedRecipeNames = getRecipesData?.map((recipe) => recipe.name) || []

    const schema = z.object({
        recipeCategoryId: z.string(),
        recipeName: z.string().refine((val) => allowedRecipeNames.includes(val), { message: 'Must be one of your existing recipes.' }),
        day: z.string()
    })

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            recipeCategoryId: 'ALL_CATEGORIES',
            recipeName: '',
            day: 'NO_DAY'
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting },
        watch
    } = methods

    const selectedRecipeCategoryId = watch('recipeCategoryId')

    const onSubmit: SubmitHandler<Inputs> = async ({ recipeName, day }) => {
        const recipeIdToAdd = getRecipesData?.find((recipe) => recipe.name === recipeName)?.id.toString() || ''

        navigate(-1)
        addRecipeToMenu({
            menuId: menuId || '',
            recipeId: recipeIdToAdd,
            day: day === 'NO_DAY' ? null : day
        })
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
                        <FormRow>
                            <Combobox.HookForm
                                className='w-full'
                                label='Recipe'
                                name='recipeName'
                                options={getFilteredRecipes(selectedRecipeCategoryId, getRecipesData)}
                            />
                        </FormRow>
                        <FormRow className='mb-24'>
                            <SelectField.HookForm
                                label='Day'
                                name='day'
                                options={[
                                    { label: 'No day', value: 'NO_DAY' },
                                    ...getDayOptions().map(({ day, date }) => ({
                                        label: day,
                                        value: date
                                    }))
                                ]}
                            />
                        </FormRow>
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
            </FormProvider>
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
