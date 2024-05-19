import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import UserRouter from 'router/user'
import GuestRouter from 'router/guest'
import Sidebar from 'components/Sidebar'
import Loader from 'components/Loader'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useGetUserQuery } from 'containers/auth/queries'
import { Notifications } from 'components/Notifications'

function App() {
    const [showMenu, setShowMenu] = useState(false)

    const menuIconRef = useRef<HTMLButtonElement | null>(null)

    const { data: getUserData, isFetching: isGetUserFetching, isError: isGetUserError } = useGetUserQuery()

    const handleCloseMenu = () => {
        setShowMenu(false)
    }

    const renderMenu = () => {
        return (
            <div className='flex items-center'>
                <button ref={menuIconRef} onClick={() => setShowMenu(!showMenu)} className='ml-5 sm:hidden'>
                    <Bars3Icon className='w-7 text-primary hover:text-primary-hover' />
                </button>
            </div>
        )
    }

    const renderApp = () => {
        if (isGetUserFetching) return <Loader fullPage />
        if (isGetUserError || !getUserData) return <GuestRouter />
        return (
            <>
                <Sidebar showMenu={showMenu} closeMenu={handleCloseMenu} menuIconRef={menuIconRef} />
                <main className='sm:pl-48'>
                    <UserRouter />
                </main>
            </>
        )
    }

    const doWeDeffoHaveAUser = !!(!isGetUserFetching && !isGetUserError && getUserData)

    return (
        <div>
            <Toaster />
            <header className='fixed top-0 w-full z-20 h-14 px-4 flex justify-between items-center bg-white border-b border-b-gray-300'>
                <Link to='/lists' className='hover:no-underline'>
                    <h1 className='text-primary text-xl sm:text-3xl'>Shopping List</h1>
                </Link>
                <div className='flex items-center'>
                    {doWeDeffoHaveAUser ? <Notifications /> : null}
                    {doWeDeffoHaveAUser ? renderMenu() : null}
                </div>
            </header>
            <div className='pt-14 min-h-[101dvh] sm:min-h-dvh'>{renderApp()}</div>
        </div>
    )
}

export default App
