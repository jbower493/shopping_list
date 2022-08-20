import React from 'react'
import { useLogoutMutation } from 'utils/api'

function Dashboard() {
    const [logout, { isLoading }] = useLogoutMutation()

    return (
        <div className='h-screen'>
            <h2>Dashboard</h2>
            {isLoading ? (
                <h1>Logging out...</h1>
            ) : (
                <button type='button' onClick={() => logout('logout')}>
                    Logout
                </button>
            )}
        </div>
    )
}

export default Dashboard
