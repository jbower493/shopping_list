import React from 'react'

export interface SelectFieldProps {
    label?: string
    name: string
    options: {
        label: string
        value: string | undefined
    }[]
    onChange: React.ChangeEventHandler<HTMLSelectElement>
    onBlur?: React.FocusEventHandler<HTMLSelectElement>
    value?: string
    componentRef?: React.LegacyRef<HTMLSelectElement>
    className?: string
}

type TSelectField = React.FC<SelectFieldProps>

export const _SelectField: TSelectField = ({ label, options = [], name, onChange, onBlur, value, componentRef, className }) => {
    return (
        <div>
            {label ? <label>{label}</label> : ''}
            <select className={className} name={name} onChange={onChange} onBlur={onBlur} value={value} ref={componentRef} placeholder='No unit'>
                {options.map(({ label, value }, index) => (
                    <option key={index} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    )
}
