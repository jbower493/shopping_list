import React, { HTMLInputTypeAttribute } from 'react'
import { UseFormRegister, Path } from 'react-hook-form'
import { FieldError } from 'react-hook-form'
import ErrorMessage from 'components/Form/ErrorMessage'

interface InputFieldProps<T> {
    label: string
    name: Path<T>
    type: HTMLInputTypeAttribute
    register: UseFormRegister<T>
    validation: {
        required: string
    }
    error: FieldError | undefined
}

function InputField<T>({ label, name, type, register, validation, error }: InputFieldProps<T>) {
    return (
        <div>
            <label>{label}</label>
            {/* Calling "register" method gives us "onChange", "onBlur", "ref" and "name", which we then spread to the underlying input */}
            <input type={type} {...register(name, validation)} />
            <ErrorMessage error={error} />
        </div>
    )
}

export default InputField
