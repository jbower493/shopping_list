import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar({ showMenu, setShowMenu }: { showMenu: boolean; setShowMenu: (show: boolean) => void }) {
    return (
        <div className={`fixed w-40 h-screen pt-14 bg-gray-100${showMenu ? '' : ' hidden'} sm:block`}>
            <ul className='p-4'>
                <li className='mb-1'>
                    <Link to='/items' onClick={() => setShowMenu(false)}>
                        Items
                    </Link>
                </li>
                <li className='mb-1'>
                    <Link to='/lists' onClick={() => setShowMenu(false)}>
                        Lists
                    </Link>
                </li>
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
        </div>
    )
}

export default Sidebar
