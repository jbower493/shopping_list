import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from '../containers/auth/forms/login'
import RegisterForm from '../containers/auth/forms/register'
import RequestPasswordReset from '../containers/auth/forms/requestPasswordReset'
import ResetPassword from '../containers/auth/forms/resetPassword'

function GuestRouter() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/login' replace />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/forgot-password' element={<RequestPasswordReset />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
    )
}

export default GuestRouter
