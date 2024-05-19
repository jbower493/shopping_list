import { Validate, useFormContext } from 'react-hook-form'
import InputField from '../component'
import ErrorMessage from 'components/Form/ErrorMessage'
import { HTMLInputTypeAttribute } from 'react'

export interface InputFieldHookFormWrapperProps<T, S = any> {
    label: string
    name: string
    type?: HTMLInputTypeAttribute
    validate?: Validate<T, S>
}

function InputFieldHookFormWrapper<T, S = any>({ label, name, type = 'text', validate }: InputFieldHookFormWrapperProps<T, S>): JSX.Element {
    const { register, formState } = useFormContext()

    // TODO: fix type error and any
    // @ts-ignore
    const registered = register(name, { validate })

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
