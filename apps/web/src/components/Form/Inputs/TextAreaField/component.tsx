import React from 'react'

export interface TextAreaFieldProps {
    label: string
    name: string
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>
    value?: string
    componentRef?: React.LegacyRef<HTMLTextAreaElement>
}

type TTextAreaField = React.FC<TextAreaFieldProps>

const TextAreaField: TTextAreaField = ({ label, name, onChange, onBlur, value, componentRef }) => {
    return (
        <div>
            <label>{label}</label>
            <textarea className='h-40' name={name} onChange={onChange} onBlur={onBlur} value={value} ref={componentRef} />
        </div>
    )
}

export default TextAreaField
