import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetListsQuery } from 'utils/api/lists'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

function Lists() {
    const navigate = useNavigate()

    const { data, isFetching, isError } = useGetListsQuery()

    if (isFetching) return <Loader fullPage />
    if (isError || !data) return <h1>Lists error</h1>

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Lists</h2>
            <Button className='mb-8' onClick={() => navigate('/lists/new')}>
                Add New
            </Button>
            {data.map(({ name, id }) => (
                <div key={id} className='flex justify-between w-full max-w-md mb-2'>
                    <p>{name}</p>
                    <div>
                        <button type='button' onClick={() => navigate(`/lists/edit/${id}`)}>
                            <PencilSquareIcon className='w-5 text-emerald-500 hover:text-emerald-700 mr-4' />
                        </button>
                        <button type='button' onClick={() => navigate(`/lists/delete/${id}`)}>
                            <TrashIcon className='w-5 text-emerald-500 hover:text-emerald-700' />
                        </button>
                    </div>
                </div>
            ))}
            <Outlet />
        </div>
    )
}

export default Lists
