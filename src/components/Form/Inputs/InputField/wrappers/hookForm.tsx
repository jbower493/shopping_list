import { useFormContext } from 'react-hook-form'
import InputField from '../component'
import ErrorMessage from 'components/Form/ErrorMessage'
import { HTMLInputTypeAttribute } from 'react'

export interface InputFieldHookFormWrapperProps {
    label: string
    name: string
    type?: HTMLInputTypeAttribute
}

const InputFieldHookFormWrapper: React.FC<InputFieldHookFormWrapperProps> = ({ label, name, type = 'text' }) => {
    const { register, formState } = useFormContext()

    const registered = register(name)

    return (
        <div>
            <InputField
                label={label}
                name={registered.name}
                onChange={registered.onChange}
                onBlur={registered.onBlur}
                componentRef={registered.ref}
                type={type}
            />
            <ErrorMessage error={formState.touchedFields[registered.name] && formState.errors[registered.name]} />
        </div>
    )
}

export default InputFieldHookFormWrapper
