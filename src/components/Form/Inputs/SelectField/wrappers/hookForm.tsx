import { useFormContext } from 'react-hook-form'
import { _SelectField as SelectField } from '../component'
import ErrorMessage from 'components/Form/ErrorMessage'

export interface SelectFieldHookFormWrapperProps {
    label?: string
    name: string
    options: {
        label: string
        value: string | undefined
    }[]
    className?: string
}

const SelectFieldHookFormWrapper: React.FC<SelectFieldHookFormWrapperProps> = ({ label, name, options, className }) => {
    const { register, formState } = useFormContext()

    const registered = register(name)

    return (
        <div>
            <SelectField
                label={label}
                name={registered.name}
                onChange={registered.onChange}
                onBlur={registered.onBlur}
                componentRef={registered.ref}
                options={options}
                className={className}
            />
            <ErrorMessage error={formState.touchedFields[registered.name] && formState.errors[registered.name]} />
        </div>
    )
}

export default SelectFieldHookFormWrapper
