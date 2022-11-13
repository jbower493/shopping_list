import React from 'react'
import { Link } from 'react-router-dom'
import { useGetUserQuery, useLogoutMutation } from 'utils/api/auth'
import { toast } from 'react-hot-toast'
import Button from 'components/Button'

function Sidebar({ showMenu, setShowMenu }: { showMenu: boolean; setShowMenu: (show: boolean) => void }) {
    const { data, isFetching, isError } = useGetUserQuery()
    const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation()

    return (
        <nav className={`fixed w-40 h-screen pt-14 bg-gray-100 flex${showMenu ? '' : ' hidden'} sm:flex flex-col justify-between`}>
            <ul className='p-4'>
                <li className='mb-1'>
                    <Link to='/lists' onClick={() => setShowMenu(false)}>
                        Lists
                    </Link>
                </li>
                {/* <li className='mb-1'>
                    <Link to='/items' onClick={() => setShowMenu(false)}>
                        Items
                    </Link>
                </li> */}
                <li className='mb-1'>
                    <Link to='/recipes' onClick={() => setShowMenu(false)}>
                        Recipes
                    </Link>
                </li>
                <li>
                    <Link to='/shop' onClick={() => setShowMenu(false)}>
                        Shop
                    </Link>
                </li>
            </ul>
            {!isFetching && !isError && data ? (
                <div className='flex justify-center items p-4'>
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
                                    setShowMenu(false)
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
