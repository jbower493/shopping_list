import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useGetCategoriesQuery } from './queries'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
// this still all needs changing from the items stuff
function Categories() {
    const navigate = useNavigate()

    const { data: getCategoriesData, isFetching: isGetCategoriesFetching, isError: isGetCategoriesError } = useGetCategoriesQuery()

    if (isGetCategoriesFetching) return <Loader fullPage />
    if (isGetCategoriesError || !getCategoriesData) return <h1>Categories error</h1>

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Categories</h2>
            <Button className='mb-8' onClick={() => navigate('/categories/new')}>
                Add New
            </Button>
            {getCategoriesData.map(({ name, id }) => (
                <div key={id} className='flex justify-between w-full max-w-md mb-2'>
                    <Link to={`/categories/edit/${id}`} className='text-black hover:text-black'>
                        {name}
                    </Link>
                    <div>
                        <button className='mr-4' type='button' onClick={() => navigate(`/categories/edit/${id}`)}>
                            <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                        </button>
                        <button type='button' onClick={() => navigate(`/categories/delete/${id}`)}>
                            <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                        </button>
                    </div>
                </div>
            ))}
            <Outlet />
        </div>
    )
}

export default Categories
