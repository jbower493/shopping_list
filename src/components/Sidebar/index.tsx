import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div className='fixed w-40 h-screen pt-14 bg-gray-100'>
            <ul className='p-4'>
                <li className='mb-1'>
                    <Link to='/items'>Items</Link>
                </li>
                <li className='mb-1'>
                    <Link to='/lists'>Lists</Link>
                </li>
                <li className='mb-1'>
                    <Link to='/recipes'>Recipes</Link>
                </li>
                <li>
                    <Link to='/shop'>Shop</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
