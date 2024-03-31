import React from 'react'

export interface SelectFieldProps {
    label: string
    name: string
    options: {
        label: string
        value: string | undefined
    }[]
    onChange: React.ChangeEventHandler<HTMLSelectElement>
    onBlur?: React.FocusEventHandler<HTMLSelectElement>
    value?: string
    componentRef?: React.LegacyRef<HTMLSelectElement>
}

type TSelectField = React.FC<SelectFieldProps>

const SelectField: TSelectField = ({ label, options = [], name, onChange, onBlur, value, componentRef }) => {
    return (
        <div>
            <label>{label}</label>
            <select name={name} onChange={onChange} onBlur={onBlur} value={value} ref={componentRef}>
                {options.map(({ label, value }, index) => (
                    <option key={index} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectField
