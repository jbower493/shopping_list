import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserKey, useLogoutMutation } from 'containers/auth/queries'
import { useGetUserQuery } from 'containers/auth/queries'
import { toast } from 'react-hot-toast'
import Button from 'components/Button'
import { queryClient } from 'utils/api/queryClient'

interface SidebarProps {
    showMenu: boolean
    closeMenu: () => void
    menuIconRef: React.MutableRefObject<HTMLElement | null>
}

function Sidebar({ showMenu, closeMenu, menuIconRef }: SidebarProps) {
    const sidebarRef = useRef<HTMLElement | null>(null)

    const { data: getUserData, isFetching: isGetUserFetching, isError: isGetUserError } = useGetUserQuery()
    const { mutate: logout, isLoading: isLogoutLoading } = useLogoutMutation()

    const handleClickAway = (e: MouseEvent) => {
        const target = e.target as Node
        if (sidebarRef.current && !sidebarRef.current.contains(target) && !menuIconRef.current?.contains(target)) closeMenu()
    }

    useEffect(() => {
        document.addEventListener('click', handleClickAway)

        return () => document.removeEventListener('click', handleClickAway)
    }, [])

    return (
        <nav
            ref={sidebarRef}
            className={`fixed top-0 h-full pt-14 w-40 bg-gray-100 flex${
                showMenu ? ' translate-x-0' : ' -translate-x-full'
            } transition-transform sm:translate-x-0 flex-col justify-between z-10`}
        >
            <ul className='p-4'>
                <li className='mb-1'>
                    <Link to='/lists' onClick={() => closeMenu()}>
                        Lists
                    </Link>
                </li>
                <li className='mb-1'>
                    <Link to='/recipes' onClick={() => closeMenu()}>
                        Recipes
                    </Link>
                </li>
                <li className='mb-1'>
                    <Link to='/menus' onClick={() => closeMenu()}>
                        Menus
                    </Link>
                </li>
                <li className='mb-1'>
                    <Link to='/items' onClick={() => closeMenu()}>
                        Items
                    </Link>
                </li>
                <li className='mb-1'>
                    <Link to='/categories' onClick={() => closeMenu()}>
                        Categories
                    </Link>
                </li>
                <li>
                    <Link to='/shop' onClick={() => closeMenu()}>
                        Shop
                    </Link>
                </li>
            </ul>
            {!isGetUserFetching && !isGetUserError && getUserData ? (
                <div className='flex justify-center items p-4'>
                    <Button
                        className='w-full'
                        color='secondary'
                        loading={isLogoutLoading}
                        disabled={isLogoutLoading}
                        onClick={() => {
                            logout(undefined, {
                                onSuccess: (result) => {
                                    queryClient.invalidateQueries(getUserKey)
                                    toast.success(result.data.message)
                                    closeMenu()
                                }
                            })
                        }}
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                ''
            )}
        </nav>
    )
}

export default Sidebar
