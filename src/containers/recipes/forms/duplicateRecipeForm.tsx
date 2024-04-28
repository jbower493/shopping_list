import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { recipesQueryKey, useDuplicateRecipeMutation, useGetSingleRecipeQuery } from '../queries'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { queryClient } from 'utils/queryClient'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'

type Inputs = {
    name: string
}

const schema = z.object({
    name: z.string().min(1, 'Required')
})

function DuplicateRecipeForm() {
    const navigate = useNavigate()

    const { recipeId } = useParams()

    const { data: singleRecipeData, isFetching: isSingleRecipeFetching } = useGetSingleRecipeQuery(recipeId || '')

    const { mutateAsync: duplicateRecipe } = useDuplicateRecipeMutation()

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            name: `${singleRecipeData?.name} (copy)`
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
        await duplicateRecipe(
            { recipeId: singleRecipeData?.id.toString() || '', attributes: { name } },
            {
                onSuccess(res) {
                    toast.success(res.message)
                    queryClient.invalidateQueries(recipesQueryKey())
                    navigate(`/recipes/edit/${res.data?.new_recipe_id}`)
                }
            }
        )
    }

    const renderForm = () => {
        return (
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormRow>
                            <InputField.HookForm label='New Recipe Name' name='name' />
                        </FormRow>
                    </ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={true} text='Duplicate Recipe' />
                        ]}
                    />
                </form>
            </FormProvider>
        )
    }

    return (
        <div>
            <UrlModal title='Duplicate Recipe' desc={singleRecipeData?.name} onClose={() => navigate(-1)} loading={isSingleRecipeFetching}>
                {renderForm()}
            </UrlModal>
        </div>
    )
}

export default DuplicateRecipeForm
