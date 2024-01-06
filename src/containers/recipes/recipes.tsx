import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetRecipesQuery } from './queries'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import CategoryTag from 'components/CategoryTag'
import { useGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'

function Recipes() {
    const navigate = useNavigate()

    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()

    const {
        data: getRecipeCategoriesData,
        isFetching: isGetRecipeCategoriesFetching,
        isError: isGetRecipeCategoriesError
    } = useGetRecipeCategoriesQuery()

    if (isGetRecipesFetching || isGetRecipeCategoriesFetching) return <Loader fullPage />
    if (isGetRecipesError || !getRecipesData || !getRecipeCategoriesData || isGetRecipeCategoriesError) return <h1>Recipes error</h1>

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Recipes</h2>
            <Button className='mb-8' onClick={() => navigate('/recipes/new')}>
                Add New
            </Button>
            {getRecipesData.map(({ name, id, recipe_category }) => (
                <div key={id} className='flex justify-between w-full max-w-md mb-2'>
                    <div className='flex items-center flex-wrap'>
                        <p>{name}</p>
                        <CategoryTag
                            key={id}
                            className='ml-2'
                            categoriesData={getRecipeCategoriesData}
                            categoryName={recipe_category?.name || 'Uncategorized'}
                            size='sm'
                        />
                    </div>
                    <div>
                        <button className='mr-4' type='button' onClick={() => navigate(`/recipes/edit/${id}`)}>
                            <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                        </button>
                        <button type='button' onClick={() => navigate(`/recipes/delete/${id}`)}>
                            <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                        </button>
                    </div>
                </div>
            ))}
            <Outlet />
        </div>
    )
}

export default Recipes
