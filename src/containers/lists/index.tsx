import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetListsQuery, useDeleteListMutation } from 'utils/api/lists'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { TrashIcon } from '@heroicons/react/solid'

function Lists() {
    const navigate = useNavigate()

    const { data, isFetching, isError } = useGetListsQuery()
    // Do optimistic update
    const [deleteList] = useDeleteListMutation()

    if (isFetching) return <Loader fullPage />
    if (isError || !data) return <h1>Lists error</h1>

    return (
        <div className='p-4'>
            <div className='flex justify-between'>
                <h2 className='mb-4'>Lists</h2>
                <Button onClick={() => navigate('/lists/new')}>Add New</Button>
            </div>
            {data.map(({ name, id }) => (
                <div key={id} className='flex justify-between w-full max-w-md'>
                    <p>{name}</p>
                    <div>
                        <button type='button' onClick={() => deleteList(id)}>
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
