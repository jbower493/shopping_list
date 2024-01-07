import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetRecipeCategoriesQuery } from './queries'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { TrashIcon } from '@heroicons/react/24/solid'
// this still all needs changing from the items stuff
function RecipeCategories() {
    const navigate = useNavigate()

    const {
        data: getRecipeCategoriesData,
        isFetching: isGetRecipeCategoriesFetching,
        isError: isGetRecipeCategoriesError
    } = useGetRecipeCategoriesQuery()

    if (isGetRecipeCategoriesFetching) return <Loader fullPage />
    if (isGetRecipeCategoriesError || !getRecipeCategoriesData) return <h1>Categories error</h1>

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Recipe Categories</h2>
            <Button className='mb-8' onClick={() => navigate('/recipe-categories/new')}>
                Add New
            </Button>
            {getRecipeCategoriesData.map(({ name, id }) => (
                <div key={id} className='flex justify-between w-full max-w-md mb-2'>
                    <p>{name}</p>
                    <div>
                        <button type='button' onClick={() => navigate(`/recipe-categories/delete/${id}`)}>
                            <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                        </button>
                    </div>
                </div>
            ))}
            <Outlet />
        </div>
    )
}

export default RecipeCategories
