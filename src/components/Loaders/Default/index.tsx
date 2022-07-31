import React from 'react'

interface DefaultLoaderProps {
    message?: string
}

function DefaultLoader({ message }: DefaultLoaderProps) {
    return (
        <h1>Loading... {message || ''}</h1>
    )
}

export default DefaultLoader
