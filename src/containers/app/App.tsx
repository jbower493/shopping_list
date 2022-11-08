import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import UserRouter from 'router/user'
import GuestRouter from 'router/guest'
import Sidebar from 'components/Sidebar'
import Loader from 'components/Loader'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useGetUserQuery } from 'utils/api/auth'

function App() {
    const [showMenu, setShowMenu] = useState(false)

    const { data, isFetching, isError } = useGetUserQuery()

    const renderMenu = () => {
        return (
            <div className='flex items-center'>
                <button onClick={() => setShowMenu(!showMenu)} className='ml-4 sm:hidden'>
                    <Bars3Icon className='w-7 text-primary hover:text-primary-hover' />
                </button>
            </div>
        )
    }

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
                <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
                <main className='h-screen pt-14 sm:pl-40'>
                    <UserRouter />
                </main>
            </div>
        )
    }

    return (
        <div>
            <Toaster />
            <header className='fixed z-10 w-full h-14 px-4 flex justify-between items-center bg-white border-b border-b-gray-300'>
                <h1 className='text-primary text-xl sm:text-3xl'>Shopping List</h1>
                {!isFetching && !isError && data ? renderMenu() : ''}
            </header>
            {renderApp()}
        </div>
    )
}

export default App
