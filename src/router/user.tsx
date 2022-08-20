import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from 'containers/dashboard'
import Lists from 'containers/lists'

function UserRouter() {
    return (
        <Routes>
            <Route path='/login' element={<Navigate to='/' replace />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/lists' element={<Lists />} />
            <Route path='/recipes' element={<div>Recipes</div>} />
            <Route path='*' element={<div className='h-full flex justify-center items-center'>No route</div>} />
        </Routes>
    )
}

export default UserRouter
