import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../index'
import { logout } from '../auth/api'
import DefaultLoader from '../../components/Loaders/Default'

function Dashboard() {
    const { mutate, isLoading } = useMutation(logout, {
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
        }
    })

    return (
        <div>
            <h2>Dashboard</h2>
            {isLoading ? (
                <DefaultLoader message='Logging out' />
            ) : (
                <button type='button' onClick={() => mutate()}>
                    Logout
                </button>
            )}
        </div>
    )
}

export default Dashboard
