import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetCategoriesQuery } from 'utils/api/categories'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { TrashIcon } from '@heroicons/react/24/solid'
// this still all needs changing from the items stuff
function Categories() {
    const navigate = useNavigate()

    const { data, isFetching, isError } = useGetCategoriesQuery()

    if (isFetching) return <Loader fullPage />
    if (isError || !data) return <h1>Categories error</h1>

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Categories</h2>
            <Button className='mb-8' onClick={() => navigate('/categories/new')}>
                Add New
            </Button>
            {data.map(({ name, id }) => (
                <div key={id} className='flex justify-between w-full max-w-md mb-2'>
                    <p>{name}</p>
                    <div>
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
