import React, { HTMLInputTypeAttribute } from 'react'

export interface InputFieldProps {
    label?: string
    name: string
    type?: HTMLInputTypeAttribute
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    value?: string
    componentRef?: React.LegacyRef<HTMLInputElement>
    className?: string
    placeholder?: string
}

type TInputField = React.FC<InputFieldProps>

const InputField: TInputField = ({ label, name, type = 'text', onChange, onBlur, value, componentRef, className, placeholder }) => {
    const numberFieldProps: { step?: React.InputHTMLAttributes<HTMLInputElement>['step'] } = {}

    if (type === 'number') {
        numberFieldProps.step = 0.01
    }

    return (
        <div>
            {label ? <label>{label}</label> : ''}
            <input
                className={className}
                type={type}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={componentRef}
                placeholder={placeholder}
                {...numberFieldProps}
            />
        </div>
    )
}

export default InputField
