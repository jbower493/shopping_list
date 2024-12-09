import { toast } from 'react-hot-toast'
import { useForm, SubmitHandler, FormProvider, useFieldArray } from 'react-hook-form'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import InputField from 'components/Form/Inputs/InputField'
import SubmitButton from 'components/Form/SubmitButton'
import { queryClient } from 'utils/queryClient'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormRow from 'components/Form/FormRow'
import { recipesQueryKey, useConfirmImportedRecipeMutation } from '../queries'
import { notificationsQueryKey, useNotificationsQuery } from 'components/Notifications/queries'
import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import { ImportedRecipe } from 'components/Notifications/types'
import { ConfirmImportedRecipePayload } from '../types'
import SelectField from 'components/Form/Inputs/SelectField'
import TextAreaField from 'components/Form/Inputs/TextAreaField'
import { getRecipeCategoryOptions } from 'utils/functions'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'
import { Combobox } from 'components/Form/Inputs/Combobox'
import { useQuantityUnitsQuery } from 'containers/quantityUnits/queries'
import { useGetItemsQuery } from 'containers/items/queries'
import { TrashIcon } from '@heroicons/react/24/solid'

type Inputs = {
    name: string
    recipeCategoryId: string
    instructions: string
    prepTime: string
    serves: string
    items: {
        name: string
        quantity: string
        quantityUnitId: string
        categoryId: string
    }[]
}

const schema = z.object({
    name: z.string().min(1, 'Required'),
    instructions: z.string(),
    recipeCategoryId: z.string(),
    prepTime: z.coerce.number(),
    serves: z.coerce.number(),
    items: z.array(
        z.object({
            name: z.string(),
            quantity: z.coerce.number(),
            quantityUnitId: z.string(),
            categoryId: z.string()
        })
    )
})

export function ConfirmImportedRecipeForm() {
    const navigate = useNavigate()
    const { importedRecipeId } = useParams()

    const { data: itemsData, isFetching: isItemsFetching } = useGetItemsQuery()
    const { data: recipeCategoriesdata, isFetching: isGetRecipeCategoriesFetching } = useGetRecipeCategoriesQuery()
    const { data: quantityUnitsData, isFetching: isQuantityUnitsFetching } = useQuantityUnitsQuery()

    const { data: notificationsData } = useNotificationsQuery()
    const { mutateAsync: confirmImportedRecipe } = useConfirmImportedRecipeMutation()

    const importedRecipes = notificationsData?.notifications.filter(({ type }) => type === 'imported_recipe')?.map(({ meta }) => meta) as
        | ImportedRecipe[]
        | undefined
    const importedRecipe = importedRecipes?.find(({ imported_recipe_id }) => imported_recipe_id === Number(importedRecipeId))

    const methods = useForm<Inputs>({
        mode: 'all',
        resolver: zodResolver(schema),
        values: {
            name: importedRecipe?.recipe.name || '',
            instructions: importedRecipe?.recipe.instructions || '',
            recipeCategoryId: 'none',
            prepTime: importedRecipe?.recipe.prep_time.toString() || '15',
            serves: importedRecipe?.recipe.serves.toString() || '1',
            items:
                importedRecipe?.recipe.items.map(({ name, quantity, quantity_unit }) => {
                    return {
                        name,
                        quantity: quantity.toString(),
                        quantityUnitId: quantityUnitsData?.find(({ name }) => name === quantity_unit)?.id.toString() || 'NO_UNIT',
                        // TODO
                        categoryId: 'Uncategorized'
                    }
                }) || []
        }
    })

    const { append: appendItem, remove: removeItem, fields: itemFields } = useFieldArray({ name: 'items', control: methods.control })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting }
    } = methods

    const onSubmit: SubmitHandler<Inputs> = async ({ name, instructions, prepTime, recipeCategoryId, serves, items }) => {
        const newRecipeData: ConfirmImportedRecipePayload = {
            name,
            recipe_category_id: recipeCategoryId === 'none' ? null : Number(recipeCategoryId),
            prep_time: Number(prepTime),
            serves: Number(serves),
            instructions,
            items: items.map((item) => ({
                name: item.name,
                quantity: Number(item.quantity),
                quantity_unit_id: item.quantityUnitId === 'NO_UNIT' ? null : Number(item.quantityUnitId),
                category_id: item.categoryId === 'Uncategorized' ? null : Number(item.categoryId)
            }))
        }

        await confirmImportedRecipe(
            { newRecipeData: newRecipeData, importedRecipeId: Number(importedRecipeId) },
            {
                onSuccess: (res) => {
                    toast.success(res.message)
                    queryClient.invalidateQueries(notificationsQueryKey())
                    queryClient.invalidateQueries(recipesQueryKey())
                    navigate(`/recipes/edit/${res.data?.new_recipe_id}`)
                }
            }
        )
    }

    function renderItems() {
        return itemFields.map((item, index) => {
            return (
                <div key={item.id} className='flex items-center gap-1 mb-2'>
                    <InputField.HookForm name={`items.${index}.quantity`} type='number' className='w-12 sm:w-20' />
                    <SelectField.HookForm
                        name={`items.${index}.quantityUnitId`}
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
                        className='w-[85px]'
                    />
                    <Combobox.HookForm
                        name={`items.${index}.name`}
                        options={itemsData?.map(({ name, id }) => ({ value: name, id })) || []}
                        placeholder='Item name'
                    />
                    <button className='ml-2' type='button' onClick={() => removeItem(index)}>
                        <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                    </button>
                </div>
            )
        })
    }

    return (
        <div>
            <UrlModal
                onClose={() => navigate('/recipes')}
                title='Confirm Recipe Import'
                desc={`"${importedRecipe?.recipe.name || ''}" imported from ${'Chrome extension'}`}
                loading={isGetRecipeCategoriesFetching || isQuantityUnitsFetching || isItemsFetching}
            >
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormRow>
                                <InputField.HookForm label='Save Recipe As' name='name' />
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

                            <p className='mb-1'>Items</p>
                            {renderItems()}
                            <Button
                                className='!h-8 w-22 mt-4 mb-32'
                                onClick={() => appendItem({ name: '', quantity: '1', quantityUnitId: 'NO_UNIT', categoryId: 'Uncategorized' })}
                            >
                                Add Item
                            </Button>
                        </ModalBody>
                        <ModalFooter
                            buttons={[
                                <Button key={1} color='secondary' onClick={() => navigate('/recipes')}>
                                    Back
                                </Button>,
                                <SubmitButton key={2} isSubmitting={isSubmitting} isValid={isValid} isDirty={true} text='Confirm Recipe Import' />
                            ]}
                        />
                    </form>
                </FormProvider>
            </UrlModal>
        </div>
    )
}
