import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetSingleMenuQuery, useAddRecipeToMenuMutation } from 'utils/api/menus'
import { useGetRecipesQuery } from 'utils/api/recipes'
import Loader from 'components/Loader'
import { PlusIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/outline'
import EditMenuRecipe from 'containers/menus/components/editMenuRecipe'

function EditMenu() {
    // The recipe id as a string
    const [recipeToAdd, setRecipeToAdd] = useState<string>('')
    const [anyChanges, setAnyChanges] = useState<boolean>(false)

    const { menuId } = useParams()

    const { data: menuData, isFetching: isGetMenuFetching, isError: isGetMenuError } = useGetSingleMenuQuery(menuId || '')
    const { data: recipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()

    const [addRecipeToMenu, { isLoading: isAddRecipeLoading }] = useAddRecipeToMenuMutation()

    useEffect(() => {
        if (recipesData && recipesData.length > 0) setRecipeToAdd(recipesData[0].id.toString())
    }, [recipesData])

    if (isGetMenuFetching || isGetRecipesFetching) return <Loader fullPage />
    if (isGetMenuError || !menuData || isGetRecipesError || !recipesData) return <h1>Menu error</h1>

    const { name, id, recipes } = menuData

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
        const options = recipesData.map(({ name, id }) => (
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
                {isAddRecipeLoading ? (
                    <Loader size={'small'} />
                ) : (
                    <button
                        onClick={() => {
                            addRecipeToMenu({ menuId: id.toString(), recipeId: Number(recipeToAdd) })
                                .unwrap()
                                .then(() => {
                                    setAnyChanges(true)
                                })
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
