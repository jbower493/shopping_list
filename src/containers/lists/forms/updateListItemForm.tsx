import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { singleListQueryKey, useGetSingleListQuery, useUpdateListItemQuantityMutation } from '../queries'
import SelectField from 'components/Form/Inputs/SelectField'
import SubmitButton from 'components/Form/SubmitButton'
import FormRow from 'components/Form/FormRow'
import InputField from 'components/Form/Inputs/InputField'
import { useQuantityUnitsQuery } from 'containers/quantityUnits/queries'
import { useUploadItemImageMutation } from 'containers/items/queries'
import { useRef } from 'react'
import { queryClient } from 'utils/queryClient'

type Inputs = {
    quantity: string
    quantityUnitId: string
}

export function UpdateListItemForm() {
    const navigate = useNavigate()
    const { listId, itemId } = useParams()

    const itemImageInputRef = useRef<HTMLInputElement>(null)

    const { data: quantityUnitsData, isFetching: isQuantityUnitsFetching, isError: isQuantityUnitsError } = useQuantityUnitsQuery()
    const { data: singleListData, isFetching: isSingleListFetching, isError: isSingleListError } = useGetSingleListQuery(listId || '')

    const { mutateAsync: updateListItemQuantity } = useUpdateListItemQuantityMutation()
    const { mutate: uploadItemImage, isLoading: isUploadItemImageLoading } = useUploadItemImageMutation()

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

    function handleImportFromImageSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!itemImageInputRef.current) {
            return
        }

        const file = itemImageInputRef.current.files?.[0]

        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append('item_image', file)

        uploadItemImage(
            { id: itemId || '', formData },
            {
                onSuccess() {
                    queryClient.invalidateQueries(singleListQueryKey(listId || ''))
                }
            }
        )
    }

    const renderForm = () => {
        if (isSingleListError || isQuantityUnitsError) return <h2>Error fetching data!</h2>
        if (!singleListData || !quantityUnitsData) return ''

        return (
            <div>
                <form onSubmit={handleImportFromImageSubmit} className='p-4 flex items-end gap-2'>
                    <div className='flex-1'>
                        <label className='block mb-1' htmlFor='importFromImage'>
                            Image
                        </label>
                        {foundListItem?.image_url ? (
                            <div className='relative mb-2 h-32 max-w-[250px]'>
                                <img className='h-full w-full object-cover rounded-md' src={foundListItem.image_url} alt={foundListItem.name} />
                            </div>
                        ) : (
                            <div>None selected</div>
                        )}
                        <input ref={itemImageInputRef} id='importFromImage' type='file' name='item_image' />
                    </div>
                    <Button className='w-20' type='submit' loading={isUploadItemImageLoading}>
                        Upload
                    </Button>
                </form>

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
                                <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={isDirty} text='Update' />
                            ]}
                        />
                    </form>
                </FormProvider>
            </div>
        )
    }

    return (
        <div>
            <UrlModal
                title='Update List Item'
                desc={foundListItem?.name}
                onClose={() => navigate(-1)}
                loading={isSingleListFetching || isQuantityUnitsFetching}
            >
                <>{renderForm()}</>
            </UrlModal>
        </div>
    )
}
