import React from 'react'
import UserRouter from 'router/user'
import GuestRouter from 'router/guest'
import { useGetUserQuery } from 'utils/api'

function App() {
    const { data, isFetching, isError } = useGetUserQuery()

    function renderApp() {
        if (isFetching) return <h1>Getting user...</h1>
        if (isError || !data) return <GuestRouter />
        return <UserRouter />
    }

    return <div className='App'>{renderApp()}</div>
}

export default App
