import React from 'react'
import { useQuery } from '@tanstack/react-query'
import UserRouter from '../../router/user'
import GuestRouter from '../../router/guest'
import { getUser } from '../auth/api'

function App() {
    const { data, isLoading, isError, isRefetching } = useQuery(['user'], getUser)

    function renderApp() {
        if (isLoading || isRefetching) return <h1>Getting User...</h1>
        if (!data || isError) return <GuestRouter />
        return <UserRouter />
    }

    return <div className='App'>{renderApp()}</div>
}

export default App
