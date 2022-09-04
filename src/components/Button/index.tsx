import React, { ReactNode } from 'react'
import Loader from 'components/Loader'

interface ButtonProps {
    children: ReactNode
    className?: string
    type?: 'submit'
    onClick?: () => void
    loading?: boolean
    disabled?: boolean
    color?: 'primary' | 'secondary' | 'error'
}

function Button({ children, className, type, onClick, loading, disabled, color }: ButtonProps) {
    const getColor = () => {
        if (disabled) return 'bg-gray-300 text-white'
        if (color === 'error') return 'bg-red-500 hover:bg-red-600 text-white'
        if (color === 'secondary') return 'bg-gray-100 hover:bg-gray-200'
        return 'bg-emerald-500 hover:bg-emerald-600 text-white'
    }

    return (
        <button
            className={`w-40 ${disabled ? 'cursor-default ' : ' '}${getColor()} h-9 flex justify-center items-center rounded${
                className ? ' ' + className : ''
            }`}
            type={type ? 'submit' : 'button'}
            onClick={() => {
                if (!disabled && onClick) onClick()
            }}
        >
            {loading ? <Loader size='small' color={disabled ? 'disabled' : 'primary'} /> : children}
        </button>
    )
}

export default Button
