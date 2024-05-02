import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { useGetSingleListQuery, useUpdateListItemQuantityMutation } from '../queries'
import SelectField from 'components/Form/Inputs/SelectField'
import SubmitButton from 'components/Form/SubmitButton'
import FormRow from 'components/Form/FormRow'
import InputField from 'components/Form/Inputs/InputField'
import { useQuantityUnitsQuery } from 'containers/quantityUnits/queries'

type Inputs = {
    quantity: string
    quantityUnitId: string
}

export function UpdateListItemQuantityForm() {
    const navigate = useNavigate()
    const { listId, itemId } = useParams()

    const { data: quantityUnitsData, isFetching: isQuantityUnitsFetching, isError: isQuantityUnitsError } = useQuantityUnitsQuery()
    const { data: singleListData, isFetching: isSingleListFetching, isError: isSingleListError } = useGetSingleListQuery(listId || '')
    const { mutateAsync: updateListItemQuantity } = useUpdateListItemQuantityMutation()

    const foundListItem = singleListData?.items.find(({ id }) => id === Number(itemId))

    const methods = useForm<Inputs>({
        mode: 'onChange',
        defaultValues: {
            quantity: foundListItem?.item_quantity.quantity.toString() || '',
            quantityUnitId: foundListItem?.item_quantity.quantity_unit?.id.toString() || 'NO_UNIT'
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting, isDirty }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ quantity, quantityUnitId }) => {
        const quanityUnitIdToSend = quantityUnitId === 'NO_UNIT' ? null : Number(quantityUnitId)
        const attributes = { item_id: Number(itemId), quantity: Number(quantity), quantity_unit_id: quanityUnitIdToSend }

        await updateListItemQuantity(
            { listId: listId || '', attributes },
            {
                onSuccess() {
                    navigate(-1)
                }
            }
        )
    }

    const renderForm = () => {
        if (isSingleListError || isQuantityUnitsError) return <h2>Error fetching data!</h2>
        if (!singleListData || !quantityUnitsData) return ''

        return (
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormRow>
                            <InputField.HookForm label='Quantity' name='quantity' type='number' />
                        </FormRow>
                        <FormRow>
                            <SelectField.HookForm
                                label='Unit'
                                name='quantityUnitId'
                                options={[
                                    {
                                        label: 'no unit',
                                        value: 'NO_UNIT'
                                    },
                                    ...(quantityUnitsData?.map((quantityUnit) => ({
                                        label: quantityUnit.symbol,
                                        value: quantityUnit.id.toString(10)
                                    })) || [])
                                ]}
                            />
                        </FormRow>
                    </ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Update Quantity' />
                        ]}
                    />
                </form>
            </FormProvider>
        )
    }

    return (
        <div>
            <UrlModal
                title='Update List Item Quantity'
                desc={foundListItem?.name}
                onClose={() => navigate(-1)}
                loading={isSingleListFetching || isQuantityUnitsFetching}
            >
                <>{renderForm()}</>
            </UrlModal>
        </div>
    )
}
