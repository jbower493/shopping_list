import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import { itemsQueryKey, useEditItemMutation, useGetItemsQuery, useUploadItemImageMutation } from '../queries'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { queryClient } from 'utils/queryClient'
import SelectField from 'components/Form/Inputs/SelectField'
import { getCategoryOptions } from 'utils/functions'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'
import { useGetCategoriesQuery } from 'containers/categories/queries'
import { listsQueryKey } from 'containers/lists/queries'
import { recipesQueryKey } from 'containers/recipes/queries'
import { useRef } from 'react'

type Inputs = {
    name: string
    categoryId: string
}

const schema = z.object({
    name: z.string().min(1, 'Required'),
    categoryId: z.string()
})

function EditItemDetailsForm() {
    const navigate = useNavigate()
    const { itemId } = useParams()

    const itemImageInputRef = useRef<HTMLInputElement>(null)

    const { data: categoriesData } = useGetCategoriesQuery()
    const { data: itemsData } = useGetItemsQuery()

    const { mutateAsync: editItem } = useEditItemMutation()
    const { mutate: uploadItemImage, isLoading: isUploadItemImageLoading } = useUploadItemImageMutation()

    const item = itemsData?.find((item) => item.id === Number(itemId))

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            name: item?.name,
            categoryId: item?.category?.id.toString() || 'none'
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ name, categoryId }) => {
        await editItem(
            {
                itemId: itemId || '',
                attributes: {
                    name,
                    category_id: categoryId === 'none' ? null : Number(categoryId)
                }
            },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    queryClient.invalidateQueries(recipesQueryKey())
                    queryClient.invalidateQueries(listsQueryKey())
                    queryClient.invalidateQueries(itemsQueryKey())
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
                    queryClient.invalidateQueries(listsQueryKey())
                    queryClient.invalidateQueries(itemsQueryKey())
                }
            }
        )
    }

    return (
        <div>
            <UrlModal title='Edit Item' desc='Update the name or category of your item' onClose={() => navigate(-1)}>
                <div>
                    <form onSubmit={handleImportFromImageSubmit} className='p-4 flex items-end gap-2'>
                        <div className='flex-1'>
                            <label className='block mb-1' htmlFor='importFromImage'>
                                Image
                            </label>
                            {item?.image_url ? (
                                <div className='relative mb-2 h-32 max-w-[250px]'>
                                    <img className='h-full w-full object-cover rounded-md' src={item.image_url} alt={item.name} />
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
                                    <InputField.HookForm label='Name' name='name' />
                                </FormRow>
                                <FormRow>
                                    <SelectField.HookForm label='Category' name='categoryId' options={getCategoryOptions(categoriesData)} />
                                </FormRow>
                            </ModalBody>
                            <ModalFooter
                                buttons={[
                                    <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                        Back
                                    </Button>,
                                    <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={true} text='Save' />
                                ]}
                            />
                        </form>
                    </FormProvider>
                </div>
            </UrlModal>
        </div>
    )
}

export default EditItemDetailsForm
