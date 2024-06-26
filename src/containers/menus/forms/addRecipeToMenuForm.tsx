import { useEffect } from 'react'
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
    day: string
}

const schema = z.object({
    recipeCategoryId: z.string(),
    recipeId: z.string(),
    day: z.string()
})

function AddRecipeToMenuForm() {
    const navigate = useNavigate()
    const { menuId } = useParams()

    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()
    const { data: getRecipeCategoriesData, isFetching: isGetRecipeCategoriesFetching } = useGetRecipeCategoriesQuery()

    const { mutate: addRecipeToMenu } = useAddRecipeToMenuMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            recipeCategoryId: 'ALL_CATEGORIES',
            recipeId: getRecipesData?.[0]?.id.toString(),
            day: 'NO_DAY'
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting },
        watch,
        setValue
    } = methods

    const selectedRecipeCategoryId = watch('recipeCategoryId')

    const onSubmit: SubmitHandler<Inputs> = async ({ recipeId, day }) => {
        navigate(-1)
        addRecipeToMenu({ menuId: menuId || '', recipeId, day: day === 'NO_DAY' ? null : day })
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
                        <FormRow>
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
