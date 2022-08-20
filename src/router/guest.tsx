import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from '../containers/auth/forms/login'
import RegisterForm from '../containers/auth/forms/register'

function GuestRouter() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/login' replace />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
        </Routes>
    )
}

export default GuestRouter
