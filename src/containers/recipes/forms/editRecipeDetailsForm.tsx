import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
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
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'

type Inputs = {
    name: string
    instructions?: string
    recipeCategoryId: string
    prepTime: string
    serves: string
}

const schema = z.object({
    name: z.string().min(1, 'Required'),
    instructions: z.string(),
    recipeCategoryId: z.string(),
    prepTime: z.coerce.number(),
    serves: z.coerce.number()
})

function EditRecipeDetailsForm() {
    const navigate = useNavigate()
    const { recipeId } = useParams()

    const { data: getRecipeCategoriesData } = useGetRecipeCategoriesQuery()

    const { data: getSingleRecipeData } = useGetSingleRecipeQuery(recipeId || '')

    const { mutateAsync: editRecipe } = useEditRecipeMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            name: getSingleRecipeData?.name,
            instructions: getSingleRecipeData?.instructions || undefined,
            recipeCategoryId: getSingleRecipeData?.recipe_category?.id.toString() || 'none',
            prepTime: getSingleRecipeData?.prep_time?.toString() || '15',
            serves: getSingleRecipeData?.serves?.toString() || '1'
        }
    })

    const {
        handleSubmit,
        formState: { isDirty, isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ name, instructions, recipeCategoryId, prepTime, serves }) => {
        await editRecipe(
            {
                recipeId: recipeId || '',
                attributes: {
                    name,
                    instructions,
                    recipe_category_id: recipeCategoryId === 'none' ? null : Number(recipeCategoryId),
                    prep_time: Number(prepTime),
                    serves: Number(serves)
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
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormRow>
                                <InputField.HookForm label='Name' name='name' />
                            </FormRow>
                            <FormRow>
                                <SelectField.HookForm
                                    label='Recipe Category'
                                    name='recipeCategoryId'
                                    options={getRecipeCategoryOptions(getRecipeCategoriesData)}
                                />
                            </FormRow>
                            <div className='flex gap-1 mb-3'>
                                <InputField.HookForm label='Prep Time' name='prepTime' type='number' step={1} className='flex-1' />
                                <InputField.HookForm label='Serves' name='serves' type='number' step={1} className='flex-1' />
                            </div>
                            <FormRow>
                                <TextAreaField.HookForm label='Instructions' name='instructions' />
                            </FormRow>
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
                </FormProvider>
            </UrlModal>
        </div>
    )
}

export default EditRecipeDetailsForm
