import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleListQuery } from 'utils/api/lists'
import Loader from 'components/Loader'

function EditList() {
    const { listId } = useParams()

    const { data, isFetching, isError } = useGetSingleListQuery(Number(listId))

    if (isFetching) return <Loader fullPage />
    if (isError || !data) return <h1>List error</h1>

    return (
        <div className='p-4'>
            <h2 className='mb-4'>Edit List</h2>
        </div>
    )
}

export default EditList
