import React, { ReactNode } from 'react'

interface ButtonProps {
    children: ReactNode
    className?: string
    type?: 'submit'
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function Button({ children, className, type, onClick }: ButtonProps) {
    return (
        <button
            className={`w-40 bg-emerald-500 hover:bg-emerald-600 text-white h-9 flex justify-center items-center rounded${
                className ? ' ' + className : ''
            }`}
            type={type ? 'submit' : 'button'}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
