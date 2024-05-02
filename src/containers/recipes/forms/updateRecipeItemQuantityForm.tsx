import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { useGetSingleRecipeQuery, useUpdateRecipeItemQuantityMutation } from '../queries'
import SelectField from 'components/Form/Inputs/SelectField'
import SubmitButton from 'components/Form/SubmitButton'
import FormRow from 'components/Form/FormRow'
import InputField from 'components/Form/Inputs/InputField'
import { useQuantityUnitsQuery } from 'containers/quantityUnits/queries'

type Inputs = {
    quantity: string
    quantityUnitId: string
}

export function UpdateRecipeItemQuantityForm() {
    const navigate = useNavigate()
    const { recipeId, itemId } = useParams()

    const { data: quantityUnitsData, isFetching: isQuantityUnitsFetching, isError: isQuantityUnitsError } = useQuantityUnitsQuery()
    const { data: singleRecipeData, isFetching: isSingleRecipeFetching, isError: isSingleRecipeError } = useGetSingleRecipeQuery(recipeId || '')
    const { mutateAsync: updateRecipeItemQuantity } = useUpdateRecipeItemQuantityMutation()

    const foundListItem = singleRecipeData?.items.find(({ id }) => id === Number(itemId))

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

        await updateRecipeItemQuantity(
            { recipeId: recipeId || '', attributes },
            {
                onSuccess() {
                    navigate(-1)
                }
            }
        )
    }

    const renderForm = () => {
        if (isSingleRecipeError || isQuantityUnitsError) return <h2>Error fetching data!</h2>
        if (!singleRecipeData || !quantityUnitsData) return ''

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
                title='Update Recipe Item Quantity'
                desc={foundListItem?.name}
                onClose={() => navigate(-1)}
                loading={isSingleRecipeFetching || isQuantityUnitsFetching}
            >
                <>{renderForm()}</>
            </UrlModal>
        </div>
    )
}
