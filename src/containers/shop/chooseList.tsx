import React from 'react'
import { Link } from 'react-router-dom'
import { useGetListsQuery } from 'utils/api/lists'
import Loader from 'components/Loader'

function ChooseList() {
    const { data, isFetching, isError } = useGetListsQuery()

    if (isFetching) return <Loader fullPage />
    if (isError || !data) return <h1>Lists error</h1>

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Choose A List</h2>
            {data.map(({ id, name }) => (
                <Link
                    className='mb-2 text-primary text-xl font-semibold hover:text-primary-hover hover:no-underline block'
                    key={id}
                    to={`/shop/${id}`}
                >
                    {name}
                </Link>
            ))}
        </div>
    )
}

export default ChooseList
