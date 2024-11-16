import { useNavigate, useParams } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import Button from 'components/Button'
import CategoryTag from 'components/CategoryTag'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'
import { useState } from 'react'
import SelectField from 'components/Form/Inputs/SelectField'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useRandomRecipesMutation } from '../queries'

type ChosenCategory = {
    id: string
    quantity: number
}

export function RandomRecipesForm() {
    const navigate = useNavigate()
    const { menuId } = useParams()

    const [categoryToAdd, setCategoryToAdd] = useState<string>('ALL_CATEGORIES')
    const [chosenCategories, setChosenCategories] = useState<ChosenCategory[]>([])

    const { data: recipeCategoriesData, isLoading: isRecipeCategoriesLoading, isError: isGetRecipeCategoriesError } = useGetRecipeCategoriesQuery()

    const { mutate: randomRecipes, isLoading: isRandomRecipesLoading } = useRandomRecipesMutation()

    function generateRandomRecipes() {
        randomRecipes(
            {
                menuId: menuId || '',
                attributes: {
                    recipe_categories: chosenCategories.map(({ id, quantity }) => ({ id: id === 'ALL_CATEGORIES' ? id : Number(id), quantity }))
                }
            },
            { onSuccess: () => navigate(-1) }
        )
    }

    function renderForm() {
        if (isGetRecipeCategoriesError) return <h2>Error fetching recipes!</h2>
        if (!recipeCategoriesData) return ''

        return (
            <div>
                <ModalBody>
                    <div className='flex gap-2 mb-6'>
                        <SelectField
                            className='w-60'
                            name='categoryToAdd'
                            value={categoryToAdd}
                            onChange={(e) => setCategoryToAdd(e.target.value)}
                            options={[
                                { label: 'All categories', value: 'ALL_CATEGORIES' },
                                ...recipeCategoriesData.map((recipeCategory) => ({
                                    label: recipeCategory.name,
                                    value: recipeCategory.id.toString()
                                }))
                            ]}
                        />
                        <button
                            type='button'
                            className=''
                            onClick={() =>
                                setChosenCategories((prev) => {
                                    if (chosenCategories.some(({ id }) => id === categoryToAdd)) {
                                        return prev.map(({ id, quantity }) => ({ id, quantity: id === categoryToAdd ? quantity + 1 : quantity }))
                                    }

                                    return [...prev, { id: categoryToAdd, quantity: 1 }]
                                })
                            }
                        >
                            <PlusIcon className='w-8 text-primary hover:text-primary-hover' />
                        </button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {chosenCategories.map((chosenCategory) => {
                            const recipeCategory = recipeCategoriesData.find((category) => category.id === Number(chosenCategory.id))

                            return (
                                <div key={chosenCategory.id} className='flex gap-5'>
                                    <div className='w-60'>
                                        <CategoryTag
                                            categoriesData={recipeCategoriesData}
                                            categoryName={chosenCategory.id === 'ALL_CATEGORIES' ? 'All Categories' : recipeCategory?.name || ''}
                                        />
                                    </div>
                                    <div className='flex gap-2'>
                                        <button
                                            type='button'
                                            className=''
                                            onClick={() =>
                                                setChosenCategories((prev) =>
                                                    prev
                                                        .map(({ id, quantity }) => ({
                                                            id,
                                                            quantity: id === chosenCategory.id ? quantity - 1 : quantity
                                                        }))
                                                        .filter(({ quantity }) => quantity)
                                                )
                                            }
                                        >
                                            <MinusCircleIcon className='w-5 text-primary' />
                                        </button>
                                        <div className='w-10 text-center'>{chosenCategory.quantity}</div>
                                        <button
                                            type='button'
                                            className=''
                                            onClick={() =>
                                                setChosenCategories((prev) =>
                                                    prev.map(({ id, quantity }) => ({
                                                        id,
                                                        quantity: id === chosenCategory.id ? quantity + 1 : quantity
                                                    }))
                                                )
                                            }
                                        >
                                            <PlusCircleIcon className='w-5 text-primary' />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </ModalBody>
                <ModalFooter
                    buttons={[
                        <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                            Back
                        </Button>,
                        <Button
                            key={2}
                            disabled={chosenCategories.length <= 0}
                            loading={isRandomRecipesLoading}
                            color='primary'
                            onClick={generateRandomRecipes}
                        >
                            Generate
                        </Button>
                    ]}
                />
            </div>
        )
    }

    return (
        <div>
            <UrlModal
                title='Random Recipes'
                desc='Generate a set of random recipes for your menu. Choose how many recipes you would like, and which categories you would like them from. This will override any recipes already in the menu.'
                onClose={() => navigate(-1)}
                loading={isRecipeCategoriesLoading}
            >
                <>{renderForm()}</>
            </UrlModal>
        </div>
    )
}
