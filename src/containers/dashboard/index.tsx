import React from 'react'

function Dashboard() {
    const one = 1

    return (
        <div>
            <h2>Dashboard</h2>
            {!one ? (
                <h1>Loading</h1>
            ) : (
                <button type='button' onClick={() => console.log('logout')}>
                    Logout
                </button>
            )}
        </div>
    )
}

export default Dashboard
