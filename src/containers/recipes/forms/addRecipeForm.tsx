import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
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
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Inputs = {
    name: string
    recipeCategoryId: string
}

const schema = z.object({
    name: z.string().min(1, 'Required'),
    recipeCategoryId: z.string()
})

function AddRecipeForm() {
    const navigate = useNavigate()

    const { data: getRecipeCategoriesData, isFetching: isGetRecipeCategoriesFetching } = useGetRecipeCategoriesQuery()

    const { mutateAsync: createRecipe } = useCreateRecipeMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            recipeCategoryId: ''
        }
    })

    const {
        handleSubmit,
        formState: { isDirty, isValid, isSubmitting }
    } = methods

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
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <InputField.HookForm label='Name' name='name' />
                        <SelectField.HookForm
                            label='Recipe Category'
                            name='recipeCategoryId'
                            options={getRecipeCategoryOptions(getRecipeCategoriesData)}
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
            </FormProvider>
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
