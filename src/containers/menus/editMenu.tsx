import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { singleMenuQueryKey, useAddRecipeToMenuMutation } from './queries'
import { useGetSingleMenuQuery } from './queries'
import { useGetRecipesQuery } from 'containers/recipes/queries'
import Loader from 'components/Loader'
import { PlusIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/outline'
import EditMenuRecipe from 'containers/menus/components/editMenuRecipe'
import { queryClient } from 'utils/queryClient'

function EditMenu() {
    // The recipe id as a string
    const [recipeToAdd, setRecipeToAdd] = useState<string>('')
    const [anyChanges, setAnyChanges] = useState<boolean>(false)

    const { menuId } = useParams()

    const { data: getSingleMenuData, isFetching: isGetSingleMenuFetching, isError: isGetSingleMenuError } = useGetSingleMenuQuery(menuId || '')
    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()

    const { mutate: addRecipeToMenu, isLoading: isAddRecipeToMenuLoading } = useAddRecipeToMenuMutation()

    useEffect(() => {
        if (getRecipesData && getRecipesData.length > 0) setRecipeToAdd(getRecipesData[0].id.toString())
    }, [getRecipesData])

    if (isGetSingleMenuFetching || isGetRecipesFetching) return <Loader fullPage />
    if (isGetSingleMenuError || !getSingleMenuData || isGetRecipesError || !getRecipesData) return <h1>Menu error</h1>

    const { name, id, recipes } = getSingleMenuData

    const renderCurrentRecipes = () => {
        return (
            <>
                <h3 className='mb-2'>Recipes</h3>
                <ul>
                    {recipes.map((recipe, index) => (
                        <EditMenuRecipe key={index} recipe={recipe} menuId={id} setAnyChanges={setAnyChanges} />
                    ))}
                </ul>
            </>
        )
    }

    const renderAddRecipeSelect = () => {
        const options = getRecipesData.map(({ name, id }) => (
            <option key={id} value={id} selected={Number(recipeToAdd) === id}>
                {name}
            </option>
        ))

        return (
            <select className='w-60 mb-0 mr-4' onChange={(e) => setRecipeToAdd(e.target.value)}>
                {options}
            </select>
        )
    }

    return (
        <div className='p-4'>
            <Link to='/menus'>Back to menus</Link>
            <div className='flex justify-between mb-7 mt-2'>
                <h2>Edit Menu</h2>
                <div className='flex items-center'>
                    {anyChanges ? (
                        <small className='opacity-40 flex items-center text-sm mr-2'>
                            <CheckIcon className='w-4 h-4 mr-1' />
                            Saved
                        </small>
                    ) : (
                        ''
                    )}
                    <ClipboardDocumentListIcon className='mr-2 w-7 text-primary' />
                    <p>{name}</p>
                </div>
            </div>
            <p>Add Recipe</p>
            <div className='flex items-center mb-7'>
                {renderAddRecipeSelect()}
                {isAddRecipeToMenuLoading ? (
                    <Loader size={'small'} />
                ) : (
                    <button
                        onClick={() => {
                            addRecipeToMenu(
                                { menuId: id.toString(), recipeId: recipeToAdd },
                                {
                                    onSuccess: () => {
                                        setAnyChanges(true)
                                        queryClient.invalidateQueries(singleMenuQueryKey(id.toString()))
                                    }
                                }
                            )
                        }}
                    >
                        <PlusIcon className='w-8 text-primary hover:text-primary-hover' />
                    </button>
                )}
            </div>
            {renderCurrentRecipes()}
        </div>
    )
}

export default EditMenu
