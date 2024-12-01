import { Validate, useFormContext } from 'react-hook-form'
import InputField from '../component'
import ErrorMessage from 'components/Form/ErrorMessage'
import { HTMLInputTypeAttribute } from 'react'

export interface InputFieldHookFormWrapperProps<T, S = any> {
    label?: string
    name: string
    type?: HTMLInputTypeAttribute
    validate?: Validate<T, S>
    step?: React.InputHTMLAttributes<HTMLInputElement>['step']
    className?: string
}

function InputFieldHookFormWrapper<T, S = any>({
    label,
    name,
    type = 'text',
    validate,
    step,
    className
}: InputFieldHookFormWrapperProps<T, S>): JSX.Element {
    const { register, formState } = useFormContext()

    // TODO: fix type error and any
    // @ts-ignore
    const registered = register(name, { validate })

    return (
        <div className={className}>
            <InputField
                label={label}
                name={registered.name}
                onChange={registered.onChange}
                onBlur={registered.onBlur}
                componentRef={registered.ref}
                type={type}
                step={step}
            />
            <ErrorMessage error={formState.touchedFields[registered.name] && formState.errors[registered.name]} />
        </div>
    )
}

export default InputFieldHookFormWrapper
