import React from 'react'
import { UseFormRegister, Path, FieldValues } from 'react-hook-form'
import { FieldError } from 'react-hook-form'
import ErrorMessage from 'components/Form/ErrorMessage'

interface SelectFieldProps<T extends FieldValues> {
    label: string
    name: Path<T>
    options: {
        label: string
        value: string
    }[]
    register: UseFormRegister<T>
    validation: {
        required: string
    }
    error: FieldError | undefined | false
}

function SelectField<T extends FieldValues>({ label, name, options = [], register, validation, error }: SelectFieldProps<T>) {
    return (
        <div>
            <label>{label}</label>
            {/* Calling "register" method gives us "onChange", "onBlur", "ref" and "name", which we then spread to the underlying input */}
            <select {...register(name, validation)} defaultValue={options[0]?.value || ''}>
                {options.map(({ label, value }, index) => (
                    <option key={index} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            <ErrorMessage error={error} />
        </div>
    )
}

export default SelectField
