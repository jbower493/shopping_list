import React from 'react'
import { UseFormRegister, Path, FieldValues } from 'react-hook-form'
import { FieldError } from 'react-hook-form'
import ErrorMessage from 'components/Form/ErrorMessage'

interface TextAreaFieldProps<T extends FieldValues> {
    label: string
    name: Path<T>
    register: UseFormRegister<T>
    validation?: {
        required?: string
    }
    error: FieldError | undefined | false
}

function TextAreaField<T extends FieldValues>({ label, name, register, validation = {}, error }: TextAreaFieldProps<T>) {
    return (
        <div>
            <label>{label}</label>
            {/* Calling "register" method gives us "onChange", "onBlur", "ref" and "name", which we then spread to the underlying input */}
            <textarea {...register(name, validation)} className='h-40' />
            <ErrorMessage error={error} />
        </div>
    )
}

export default TextAreaField
