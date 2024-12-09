import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { categoriesQueryKey, useEditCategoryMutation, useGetCategoriesQuery } from '../queries'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { queryClient } from 'utils/queryClient'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'
import { recipesQueryKey } from 'containers/recipes/queries'
import { itemsQueryKey } from 'containers/items/queries'
import { listsQueryKey } from 'containers/lists/queries'

type Inputs = {
    name: string
}

const schema = z.object({
    name: z.string().min(1, 'Required')
})

function EditCategoryDetailsForm() {
    const navigate = useNavigate()
    const { categoryId } = useParams()

    const { data: categoriesData } = useGetCategoriesQuery()
    const { mutateAsync: editCategory } = useEditCategoryMutation()

    const categoryName = categoriesData?.find((category) => category.id === Number(categoryId))?.name || ''

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            name: categoryName
        }
    })

    const {
        handleSubmit,
        formState: { isDirty, isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
        await editCategory(
            {
                categoryId: categoryId || '',
                attributes: {
                    name
                }
            },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    queryClient.invalidateQueries(categoriesQueryKey())
                    queryClient.invalidateQueries(listsQueryKey())
                    queryClient.invalidateQueries(recipesQueryKey())
                    queryClient.invalidateQueries(itemsQueryKey())
                    navigate(-1)
                }
            }
        )
    }

    return (
        <div>
            <UrlModal title='Edit Category' desc='Update the name of your category' onClose={() => navigate(-1)}>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormRow>
                                <InputField.HookForm label='Name' name='name' />
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

export default EditCategoryDetailsForm
