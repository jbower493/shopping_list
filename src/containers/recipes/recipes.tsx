import { Outlet, useNavigate } from 'react-router-dom'
import { useGetRecipesQuery } from './queries'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import CategoryTag from 'components/CategoryTag'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'
import { getExistingRecipeCategories } from 'utils/functions'
import { useState } from 'react'
import InputField from 'components/Form/Inputs/InputField/component'

function Recipes() {
    const navigate = useNavigate()

    const [search, setSearch] = useState('')

    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()

    const {
        data: getRecipeCategoriesData,
        isFetching: isGetRecipeCategoriesFetching,
        isError: isGetRecipeCategoriesError
    } = useGetRecipeCategoriesQuery()

    if (isGetRecipesFetching || isGetRecipeCategoriesFetching) return <Loader fullPage />
    if (isGetRecipesError || !getRecipesData || !getRecipeCategoriesData || isGetRecipeCategoriesError) return <h1>Recipes error</h1>

    const filteredRecipes = getRecipesData.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase()))

    const renderCurrentRecipes = () => {
        // Get a unique list of all the recipe categories present in the recipe
        const recipeCategoriesInRecipe = getExistingRecipeCategories(filteredRecipes)

        const renderRecipeCategory = (recipeCategoryId: number, recipeCategoryName: string) => {
            let recipeslist = filteredRecipes.filter(({ recipe_category }) => !recipe_category)

            if (recipeCategoryId !== -1) recipeslist = filteredRecipes.filter(({ recipe_category }) => recipe_category?.id === recipeCategoryId)

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
                            <div key={recipe.id} className='flex justify-between w-full max-w-md mb-2'>
                                <p>{recipe.name}</p>
                                <div>
                                    <button className='mr-4' type='button' onClick={() => navigate(`/recipes/edit/${recipe.id}`)}>
                                        <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                                    </button>
                                    <button type='button' onClick={() => navigate(`/recipes/delete/${recipe.id}`)}>
                                        <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }

        return recipeCategoriesInRecipe.map(({ id, name }) => renderRecipeCategory(id, name))
    }

    const noRecipesMessage = search
        ? 'No recipes matched your search.'
        : 'You don\'t currently have any recipes. Use the "Add New" button to create a recipe.'

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Recipes</h2>
            <div className='flex justify-between mt-4 w-full max-w-md'>
                <Button className='mb-8' onClick={() => navigate('/recipes/new')}>
                    Add New
                </Button>
                <InputField name='search' placeholder='Search for a recipe' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {filteredRecipes.length > 0 ? renderCurrentRecipes() : <p>{noRecipesMessage}</p>}
            <Outlet />
        </div>
    )
}

export default Recipes
