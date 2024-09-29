import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useListsQuery } from './queries'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { TrashIcon, PencilSquareIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'

function Lists() {
    const navigate = useNavigate()

    const { data: getListsData, isFetching: isGetListsFetching, isError: isGetListsError } = useListsQuery()

    if (isGetListsFetching) return <Loader fullPage />
    if (isGetListsError || !getListsData) return <h1>Lists error</h1>

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Lists</h2>
            <Button className='mb-8' onClick={() => navigate('/lists/new')}>
                Add New
            </Button>
            {getListsData.map(({ name, id }) => (
                <div key={id} className='flex justify-between w-full max-w-md mb-2'>
                    <Link to={`/lists/edit/${id}`} className='text-black hover:text-black'>
                        {name}
                    </Link>
                    <div>
                        <button className='mr-4' type='button' onClick={() => navigate(`/lists/edit/${id}`)}>
                            <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                        </button>
                        <button className='mr-4' type='button' onClick={() => navigate(`/shop/${id}`)}>
                            <ShoppingCartIcon className='w-5 text-primary hover:text-primary-hover' />
                        </button>
                        <button type='button' onClick={() => navigate(`/lists/delete/${id}`)}>
                            <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                        </button>
                    </div>
                </div>
            ))}
            <Outlet />
        </div>
    )
}

export default Lists
