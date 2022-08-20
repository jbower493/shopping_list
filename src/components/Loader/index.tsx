import React from 'react'

interface LoaderProps {
    size?: 'small'
    fullPage?: true
}

function Loader({ size, fullPage }: LoaderProps) {
    const getSize = () => {
        if (size) return 'w-4 h-4 border-2'
        return 'w-14 h-14 border-4'
    }

    const renderLoader = () => (
        <div className={`${getSize()} rounded-full border-8 border-emerald-500 border-t-emerald-100 border-r-emerald-100 animate-spin`} />
    )

    if (fullPage) return <div className='w-full h-full flex justify-center items-center'>{renderLoader()}</div>

    return renderLoader()
}

export default Loader
