import React from 'react'
import { useGetListsQuery } from 'utils/api/lists'
import Loader from 'components/Loader'

function Lists() {
    const { data, isLoading, isError } = useGetListsQuery()

    if (isLoading) return <Loader fullPage />
    if (isError || !data) return <h1>Lists error</h1>

    return (
        <div className='p-4'>
            {data.map(({ name, id }) => (
                <p key={id}>{name}</p>
            ))}
        </div>
    )
}

export default Lists
