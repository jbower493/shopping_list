import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import UserRouter from 'router/user'
import GuestRouter from 'router/guest'
import Sidebar from 'components/Sidebar'
import Loader from 'components/Loader'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useGetUserQuery } from 'containers/auth/queries'

function App() {
    const [showMenu, setShowMenu] = useState(false)

    const menuIconRef = useRef<HTMLButtonElement | null>(null)

    const { data: getUserData, isFetching: isGetUserFetching, isError: isGetUserError } = useGetUserQuery()
    console.log(isGetUserFetching)
    const handleCloseMenu = () => {
        setShowMenu(false)
    }

    const renderMenu = () => {
        return (
            <div className='flex items-center'>
                <button ref={menuIconRef} onClick={() => setShowMenu(!showMenu)} className='ml-4 sm:hidden'>
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
                <main className='h-full sm:pl-40'>
                    <UserRouter />
                </main>
            </>
        )
    }

    return (
        <div className='h-full h-[-webkit-fill-available]'>
            <Toaster />
            <header className='fixed top-0 w-full z-20 h-14 px-4 flex justify-between items-center bg-white border-b border-b-gray-300'>
                <Link to='/lists' className='hover:no-underline'>
                    <h1 className='text-primary text-xl sm:text-3xl'>Shopping List</h1>
                </Link>
                {!isGetUserFetching && !isGetUserError && getUserData ? renderMenu() : ''}
            </header>
            <div className='h-full h-[-webkit-fill-available] pt-14'>{renderApp()}</div>
        </div>
    )
}

export default App
