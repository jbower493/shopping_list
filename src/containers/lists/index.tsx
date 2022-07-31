import React from 'react'
import { useGetListsQuery } from './api'

function Lists() {

    const { data } = useGetListsQuery()

    return (
        <div>{data?.map((item, index) => <li key={index}>{item.name}</li>) || 'No data'}</div>
    )
}

export default Lists
