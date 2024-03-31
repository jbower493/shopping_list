import React, { HTMLInputTypeAttribute } from 'react'

export interface InputFieldProps {
    label: string
    name: string
    type?: HTMLInputTypeAttribute
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    value?: string
    componentRef?: React.LegacyRef<HTMLInputElement>
}

type TInputField = React.FC<InputFieldProps>

const InputField: TInputField = ({ label, name, type = 'text', onChange, onBlur, value, componentRef }) => {
    return (
        <div>
            <label>{label}</label>
            <input type={type} name={name} onChange={onChange} onBlur={onBlur} value={value} ref={componentRef} />
        </div>
    )
}

export default InputField
