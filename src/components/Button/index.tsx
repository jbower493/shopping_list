import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'components/Loader'

export type ButonColors = 'primary' | 'secondary' | 'error'

interface ButtonProps {
    children: ReactNode
    className?: string
    type?: 'submit'
    onClick?: () => void
    to?: string
    loading?: boolean
    disabled?: boolean
    color?: ButonColors
}

function Button({ children, className, type, onClick, to, loading, disabled, color }: ButtonProps) {
    const getColor = () => {
        if (disabled) return 'bg-gray-300 text-white'
        if (color === 'error') return 'bg-error hover:bg-error-hover text-white'
        if (color === 'secondary') return 'bg-secondary hover:bg-secondary-hover'
        return 'bg-primary hover:bg-primary-hover text-white'
    }

    const finalClassName = `px-4 ${disabled ? 'cursor-default ' : ''}${getColor()} h-9 font-medium flex justify-center items-center rounded${
        className ? ' ' + className : ''
    }`

    if (to) {
        return (
            <Link to={to} className={`${finalClassName} w-fit hover:text-white hover:no-underline`}>
                {children}
            </Link>
        )
    }

    return (
        <button
            className={finalClassName}
            type={type ? 'submit' : 'button'}
            onClick={() => {
                if (!disabled && onClick) onClick()
            }}
            disabled={disabled}
        >
            {loading ? <Loader size='small' color={disabled ? 'disabled' : 'primary'} /> : children}
        </button>
    )
}

export default Button
