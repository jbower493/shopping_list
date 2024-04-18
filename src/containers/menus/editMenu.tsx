import { useParams, Link, useNavigate, Outlet } from 'react-router-dom'
import { useGetSingleMenuQuery } from './queries'
import { useGetRecipesQuery } from 'containers/recipes/queries'
import Loader from 'components/Loader'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import EditMenuRecipe from 'containers/menus/components/editMenuRecipe'
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
        return (
            <ul>
                {[...recipes]
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((recipe) => (
                        <EditMenuRecipe key={recipe.id} recipe={recipe} menuId={id} />
                    ))}
            </ul>
        )
    }

    return (
        <div className='p-4'>
            <Link to='/menus'>Back to menus</Link>
            <div className='flex items-center mb-7 mt-2'>
                <h2>{name}</h2>
                <button className='ml-4' type='button' onClick={() => navigate(`/menus/edit/${id}/details`)}>
                    <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                </button>
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
