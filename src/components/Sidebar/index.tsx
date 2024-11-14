import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLogoutMutation } from 'containers/auth/queries'
import { useGetUserQuery } from 'containers/auth/queries'
import { toast } from 'react-hot-toast'
import Button from 'components/Button'
import { queryClient } from 'utils/queryClient'
import { userQueryKey } from 'utils/queryClient/keyFactory'
import { UserIcon, UsersIcon } from '@heroicons/react/24/solid'
import { useClickAway } from 'utils/hooks'

interface SidebarProps {
    showMenu: boolean
    closeMenu: () => void
    menuIconRef: React.MutableRefObject<HTMLElement | null>
}

function Sidebar({ showMenu, closeMenu, menuIconRef }: SidebarProps) {
    const sidebarRef = useRef<HTMLElement | null>(null)

    const { data: getUserData, isFetching: isGetUserFetching, isError: isGetUserError } = useGetUserQuery()
    const { mutate: logout, isLoading: isLogoutLoading } = useLogoutMutation()

    useClickAway([sidebarRef, menuIconRef], closeMenu)

    return (
        <nav
            ref={sidebarRef}
            className={`fixed h-dvh pt-14 w-48 top-0 bg-gray-100 flex${
                showMenu ? ' translate-x-0' : ' -translate-x-full'
            } transition-transform sm:translate-x-0 flex-col justify-between z-10`}
        >
            <div className='p-4'>
                <div className='mb-8'>
                    <div className='flex items-center gap-2'>
                        {getUserData?.additional_user ? (
                            <>
                                <UsersIcon className='w-5' />
                                <p>{getUserData?.additional_user.name}</p>
                            </>
                        ) : (
                            <>
                                <UserIcon className='w-5' />
                                <p>{getUserData?.user.name}</p>
                            </>
                        )}
                    </div>

                    {getUserData?.additional_user ? (
                        <p className='mt-2 text-xs'>
                            <span className='text-primary'>Logged in as:</span> {getUserData.user.name}
                        </p>
                    ) : (
                        <div className='mt-2 ml-7'>
                            <Link to='/account' onClick={() => closeMenu()}>
                                Account
                            </Link>
                        </div>
                    )}
                </div>
                <ul>
                    <li className='mb-2'>
                        <Link to='/lists' onClick={() => closeMenu()}>
                            Lists
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/recipes' onClick={() => closeMenu()}>
                            Recipes
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/menus' onClick={() => closeMenu()}>
                            Menus
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/items' onClick={() => closeMenu()}>
                            Items
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/categories' onClick={() => closeMenu()}>
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link to='/recipe-categories' onClick={() => closeMenu()}>
                            Recipe Categories
                        </Link>
                    </li>
                </ul>
            </div>
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
                                    queryClient.invalidateQueries(userQueryKey)
                                    toast.success(result.message)
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
