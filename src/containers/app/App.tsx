import React from 'react'
import UserRouter from 'router/user'
import GuestRouter from 'router/guest'
import Sidebar from 'components/Sidebar'
import Loader from 'components/Loader'
import { useGetUserQuery, useLogoutMutation } from 'utils/api/auth'

function App() {
    const { data, isFetching, isError } = useGetUserQuery()
    const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation()

    const renderLogoutButton = () =>
        isLogoutLoading ? (
            <Loader size='small' />
        ) : (
            <button type='button' onClick={() => logout()}>
                Logout
            </button>
        )

    const renderApp = () => {
        if (isFetching)
            return (
                <div className='h-screen pt-14'>
                    <Loader fullPage />
                </div>
            )
        if (isError || !data)
            return (
                <div className='h-screen pt-14'>
                    <GuestRouter />
                </div>
            )
        return (
            <div>
                <Sidebar />
                <main className='h-screen pt-14 pl-40'>
                    <UserRouter />
                </main>
            </div>
        )
    }

    return (
        <div>
            <header className='fixed z-10 w-full h-14 px-6 flex justify-between items-center bg-white border-b border-b-gray-300'>
                <h1 className='text-emerald-500 font-semibold text-3xl'>Shopping List</h1>
                {!isFetching && !isError && data ? renderLogoutButton() : ''}
            </header>
            {renderApp()}
        </div>
    )
}

export default App
