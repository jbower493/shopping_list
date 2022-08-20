import React from 'react'
import UserRouter from 'router/user'
import GuestRouter from 'router/guest'
import { useGetUserQuery } from 'utils/api'

function App() {
    const { data, isFetching, isError } = useGetUserQuery()

    function renderApp() {
        if (isFetching) return <h1>Getting user...</h1>
        if (isError || !data)
            return (
                <div className='h-screen pt-14'>
                    <GuestRouter />
                </div>
            )
        return (
            <div className='flex'>
                <div className='fixed w-40 h-screen pt-14 bg-gray-100'>Sidebar</div>
                <main className='h-screen pt-14 pl-40'>
                    <UserRouter />
                </main>
            </div>
        )
    }

    return (
        <div>
            <header className='fixed z-10 w-full h-14 pl-6 flex items-center bg-white border-b border-b-gray-300'>
                <h1 className='text-emerald-500 font-semibold text-3xl'>Shopping List</h1>
            </header>
            {renderApp()}
        </div>
    )
}

export default App
