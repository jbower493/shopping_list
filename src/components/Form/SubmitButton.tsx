import React from 'react'
import Button, { ButonColors } from 'components/Button'

interface SubmitButtonProps {
    isSubmitting: boolean
    isValid: boolean
    isDirty: boolean
    text: string
    color?: ButonColors
    fullWidth?: boolean
}

function SubmitButton({ isSubmitting, isValid, isDirty, text, color, fullWidth }: SubmitButtonProps) {
    return (
        <Button
            className={`${fullWidth ? 'w-full' : ''}`}
            type='submit'
            color={color}
            loading={isSubmitting}
            disabled={!isValid || !isDirty || isSubmitting}
        >
            {text}
        </Button>
    )
}

export default SubmitButton
