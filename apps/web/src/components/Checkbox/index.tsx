import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

interface CheckboxProps {
    isChecked: boolean
    onClick?: () => void
    className?: string
}

function Checkbox({ isChecked, onClick, className }: CheckboxProps) {
    const renderContent = () =>
        isChecked ? (
            <CheckCircleIcon className='w-6 text-primary' />
        ) : (
            <div className='w-5 h-5 rounded-full border-2 border-primary hover:border-primary-hover' />
        )

    if (onClick)
        return (
            <button type='button' onClick={onClick} className={className || ''}>
                {renderContent()}
            </button>
        )

    return <div className={className || ''}>{renderContent()}</div>
}

export default Checkbox
