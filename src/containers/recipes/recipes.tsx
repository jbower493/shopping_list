import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetRecipesQuery } from './queries'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

function Recipes() {
    const navigate = useNavigate()

    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()

    if (isGetRecipesFetching) return <Loader fullPage />
    if (isGetRecipesError || !getRecipesData) return <h1>Recipes error</h1>

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Recipes</h2>
            <Button className='mb-8' onClick={() => navigate('/recipes/new')}>
                Add New
            </Button>
            {getRecipesData.map(({ name, id }) => (
                <div key={id} className='flex justify-between w-full max-w-md mb-2'>
                    <p>{name}</p>
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
