import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { useCreateRecipeMutation, useImportRecipeFromImageMutation } from '../queries'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'
import SelectField from 'components/Form/Inputs/SelectField'
import { getRecipeCategoryOptions } from 'utils/functions'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'
import TextAreaField from 'components/Form/Inputs/TextAreaField'
import { useRef } from 'react'

type Inputs = {
    name: string
    recipeCategoryId: string
    instructions: string
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

function AddRecipeForm() {
    const navigate = useNavigate()
    const importFromImageInputRef = useRef<HTMLInputElement>(null)

    const { data: recipeCategoriesdata, isFetching: isGetRecipeCategoriesFetching } = useGetRecipeCategoriesQuery()

    const { mutateAsync: createRecipe } = useCreateRecipeMutation()
    const { mutate: importRecipeFromImage, isLoading: isImportRecipeFromImageLoading } = useImportRecipeFromImageMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            instructions: '',
            recipeCategoryId: 'none',
            prepTime: '15',
            serves: '1'
        }
    })

    const {
        handleSubmit,
        formState: { isDirty, isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ name, recipeCategoryId, instructions, prepTime, serves }) => {
        await createRecipe(
            {
                name,
                recipe_category_id: recipeCategoryId === 'none' ? null : Number(recipeCategoryId),
                instructions,
                prep_time: Number(prepTime),
                serves: Number(serves)
            },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    navigate(`/recipes/edit/${res.data?.recipe_id.toString()}`)
                }
            }
        )
    }

    function handleImportFromImageSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!importFromImageInputRef.current) {
            return
        }

        const file = importFromImageInputRef.current.files?.[0]

        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append('import_from_image', file)

        importRecipeFromImage(formData, {
            onSuccess(res) {
                const recipeText = res.data?.imported_recipe || []
                const formatted = recipeText.join('\n\n')
                methods.setValue('instructions', formatted)
            }
        })
    }

    const renderForm = () => {
        return (
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
                                options={getRecipeCategoryOptions(recipeCategoriesdata)}
                            />
                        </FormRow>
                        <div className='flex gap-1 mb-3'>
                            <InputField.HookForm label='Prep Time (mins)' name='prepTime' type='number' step={1} className='flex-1' />
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
                <div>
                    {/* <form onSubmit={handleImportFromImageSubmit} className='p-4 flex items-end gap-2'>
                        <div className='flex-1'>
                            <label className='block mb-1' htmlFor='importFromImage'>
                                <strong className='text-white bg-primary py-[1px] px-1 rounded-md font-medium text-xs'>NEW</strong> Import From Image
                            </label>
                            <input ref={importFromImageInputRef} id='importFromImage' type='file' name='import_from_image' />
                        </div>
                        <Button className='w-20' type='submit' loading={isImportRecipeFromImageLoading}>
                            Import
                        </Button>
                    </form> */}
                    {renderForm()}
                </div>
            </UrlModal>
        </div>
    )
}

export default AddRecipeForm
