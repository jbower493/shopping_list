import React from 'react'
import { useParams, Link, useNavigate, Outlet } from 'react-router-dom'
import { useGetSingleMenuQuery } from './queries'
import { useGetRecipesQuery } from 'containers/recipes/queries'
import Loader from 'components/Loader'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import EditMenuRecipe from 'containers/menus/components/editMenuRecipe'
import { getExistingRecipeCategories } from 'utils/functions'
import CategoryTag from 'components/CategoryTag'
import Button from 'components/Button'

function EditMenu() {
    const { menuId } = useParams()
    const navigate = useNavigate()

    const { data: getSingleMenuData, isFetching: isGetSingleMenuFetching, isError: isGetSingleMenuError } = useGetSingleMenuQuery(menuId || '')
    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()

    if (isGetSingleMenuFetching || isGetRecipesFetching) return <Loader fullPage />
    if (isGetSingleMenuError || !getSingleMenuData || isGetRecipesError || !getRecipesData) return <h1>Menu error</h1>

    const { name, id, recipes } = getSingleMenuData

    const renderCurrentRecipes = () => {
        // Get a unique list of all the recipe categories present in the recipe
        const recipeCategoriesInRecipe = getExistingRecipeCategories(recipes)

        const renderRecipeCategory = (recipeCategoryId: number, recipeCategoryName: string) => {
            let recipeslist = recipes.filter(({ recipe_category }) => !recipe_category)

            if (recipeCategoryId !== -1) recipeslist = recipes.filter(({ recipe_category }) => recipe_category?.id === recipeCategoryId)

            // TODO: remove this once the recipes are being sorted already by the backend
            recipeslist.sort((a, b) => (a.name > b.name ? 1 : -1))

            return (
                <div key={recipeCategoryId} className='mb-6'>
                    <div className='mb-2'>
                        <CategoryTag categoriesData={recipeCategoriesInRecipe.filter(({ id }) => id !== -1)} categoryName={recipeCategoryName} />
                        {recipeCategoryId === -1 ? <p className='text-[13px] opacity-40 mt-1'>Edit the recipe to assign it to a category</p> : ''}
                    </div>
                    <ul>
                        {recipeslist.map((recipe) => (
                            <EditMenuRecipe
                                key={recipe.id}
                                recipe={recipe}
                                menuId={id}
                                setAnyChanges={() => {
                                    //
                                }}
                            />
                        ))}
                    </ul>
                </div>
            )
        }

        return recipeCategoriesInRecipe.map(({ id, name }) => renderRecipeCategory(id, name))
    }

    return (
        <div className='p-4'>
            <Link to='/menus'>Back to menus</Link>
            <div className='flex justify-between mb-7 mt-2'>
                <h2>Edit Menu</h2>
                <div className='flex items-center'>
                    <ClipboardDocumentListIcon className='mr-2 w-7 text-primary' />
                    <p>{name}</p>
                </div>
            </div>
            <Button className='mb-8' onClick={() => navigate(`/menus/edit/${menuId}/add-recipe`)}>
                Add Recipe
            </Button>
            {renderCurrentRecipes()}

            <Outlet />
        </div>
    )
}

export default EditMenu
