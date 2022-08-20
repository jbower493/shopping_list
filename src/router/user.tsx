import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../containers/dashboard'

function UserRouter() {
    return (
        <Routes>
            <Route path='/login' element={<Navigate to='/' replace />} />
            <Route path='/' element={<Dashboard />} />
        </Routes>
    )
}

export default UserRouter
