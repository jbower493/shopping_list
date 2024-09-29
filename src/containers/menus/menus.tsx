import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useGetMenusQuery } from './queries'
import Loader from 'components/Loader'
import Button from 'components/Button'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

function Menus() {
    const navigate = useNavigate()

    const { data: getMenusData, isFetching: isGetMenusFetching, isError: isGetMenusError } = useGetMenusQuery()

    if (isGetMenusFetching) return <Loader fullPage />
    if (isGetMenusError || !getMenusData) return <h1>Menus error</h1>

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Menus</h2>
            <Button className='mb-8' onClick={() => navigate('/menus/new')}>
                Add New
            </Button>
            {getMenusData.map(({ name, id }) => (
                <div key={id} className='flex justify-between w-full max-w-md mb-2'>
                    <Link to={`/menus/edit/${id}`} className='text-black hover:text-black'>
                        {name}
                    </Link>
                    <div>
                        <button className='mr-4' type='button' onClick={() => navigate(`/menus/edit/${id}`)}>
                            <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                        </button>
                        <button type='button' onClick={() => navigate(`/menus/delete/${id}`)}>
                            <TrashIcon className='w-5 text-primary hover:text-primary-hover' />
                        </button>
                    </div>
                </div>
            ))}
            <Outlet />
        </div>
    )
}

export default Menus
