import { Routes, Route, Navigate, useLocation, useSearchParams } from 'react-router-dom'
import LoginForm from '../containers/auth/forms/login'
import RegisterForm from '../containers/auth/forms/register'
import RequestPasswordReset from '../containers/auth/forms/requestPasswordReset'
import ResetPassword from '../containers/auth/forms/resetPassword'

function RedirectRecipeShareRequest() {
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const action = searchParams.get('action') as 'login' | 'register'
    const recipientEmail = searchParams.get('recipient-email')

    return <Navigate to={`/${action === 'register' ? 'register' : 'login'}?ref=${location.pathname}&recipient-email=${recipientEmail}`} />
}

function GuestRouter() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/login' replace />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/forgot-password' element={<RequestPasswordReset />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/recipes/accept-shared/:shareRequestId' element={<RedirectRecipeShareRequest />} />

            <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
    )
}

export default GuestRouter
