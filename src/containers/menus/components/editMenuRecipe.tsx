import React from 'react'
import { singleMenuQueryKey, useRemoveRecipeFromMenuMutation } from '../queries'
import { TrashIcon } from '@heroicons/react/24/solid'
import Loader from 'components/Loader'
import { queryClient } from 'utils/queryClient'
import CategoryTag from 'components/CategoryTag'
import { Recipe } from 'containers/recipes/types'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'

interface EditMenuRecipeProps {
    recipe: Recipe
    menuId: number
    setAnyChanges: (anyChanges: boolean) => void
}

function EditMenuRecipe({ recipe: { name, id, recipe_category }, menuId, setAnyChanges }: EditMenuRecipeProps) {
    const { data: getRecipeCategoriesData } = useGetRecipeCategoriesQuery()

    const { mutate: removeRecipeFromMenu, isLoading: isRemoveRecipeFromMenuLoading } = useRemoveRecipeFromMenuMutation()

    return (
        <li className='flex justify-between w-full max-w-md mb-2'>
            <div className='flex items-center flex-wrap'>
                <p>{name}</p>
                <CategoryTag
                    key={id}
                    className='ml-2'
                    categoriesData={getRecipeCategoriesData || []}
                    categoryName={recipe_category?.name || 'Uncategorized'}
                    size='sm'
                />
            </div>
            {isRemoveRecipeFromMenuLoading ? (
                <Loader size='small' />
            ) : (
                <button
                    type='button'
                    onClick={() => {
                        removeRecipeFromMenu(
                            { menuId: menuId.toString(), recipeId: id },
                            {
                                onSuccess: () => {
                                    setAnyChanges(true)
                                    queryClient.invalidateQueries(singleMenuQueryKey(menuId.toString()))
                                }
                            }
                        )
                    }}
                >
                    <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                </button>
            )}
        </li>
    )
}

export default EditMenuRecipe
