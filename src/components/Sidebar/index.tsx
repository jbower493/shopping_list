import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetUserQuery, useLogoutMutation } from 'utils/api/auth'
import { toast } from 'react-hot-toast'
import Button from 'components/Button'

interface SidebarProps {
    showMenu: boolean
    closeMenu: () => void
    menuIconRef: React.MutableRefObject<HTMLElement | null>
}

function Sidebar({ showMenu, closeMenu, menuIconRef }: SidebarProps) {
    const sidebarRef = useRef<HTMLElement | null>(null)

    const { data, isFetching, isError } = useGetUserQuery()
    const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation()

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
            className={`fixed w-40 h-screen pt-14 bg-gray-100 flex${
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
                    <Link to='/items' onClick={() => closeMenu()}>
                        Items
                    </Link>
                </li>
                <li>
                    <Link to='/shop' onClick={() => closeMenu()}>
                        Shop
                    </Link>
                </li>
            </ul>
            {!isFetching && !isError && data ? (
                <div className='flex justify-center items p-4 mb-14'>
                    <Button
                        className='w-full'
                        color='secondary'
                        loading={isLogoutLoading}
                        disabled={isLogoutLoading}
                        onClick={() => {
                            logout()
                                .unwrap()
                                .then((result) => {
                                    toast.success(result.message)
                                    closeMenu()
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
