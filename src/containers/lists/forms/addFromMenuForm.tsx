import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { singleListQueryKey, useAddItemsFromMenuMutation } from '../queries'
import SelectField from 'components/Form/Inputs/SelectField'
import SubmitButton from 'components/Form/SubmitButton'
import { useGetMenusQuery } from 'containers/menus/queries'
import { queryClient } from 'utils/queryClient'

type Inputs = {
    menuId: string
}

function AddFromMenuForm() {
    const navigate = useNavigate()
    const { listId } = useParams()

    const { data: getMenusData, isFetching: isGetMenusFetching, isError: isGetMenusError } = useGetMenusQuery()
    const { mutateAsync: addItemsFromMenu } = useAddItemsFromMenuMutation()

    const methods = useForm<Inputs>({
        mode: 'onChange'
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ menuId }) => {
        await addItemsFromMenu(
            { listId: listId || '', menuId },
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
        if (isGetMenusError) return <h2>Error fetching menus!</h2>
        if (!getMenusData) return ''

        return (
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <SelectField.HookForm
                            label='Menu'
                            name='menuId'
                            options={getMenusData.map(({ id, name }) => ({
                                label: name,
                                value: id.toString()
                            }))}
                        />
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
                title='Add From Menu'
                desc='Choose a menu to add items from. This will add every item from every recipe in your menu to the current list.'
                onClose={() => navigate(-1)}
                loading={isGetMenusFetching}
            >
                <>{renderForm()}</>
            </UrlModal>
        </div>
    )
}

export default AddFromMenuForm
