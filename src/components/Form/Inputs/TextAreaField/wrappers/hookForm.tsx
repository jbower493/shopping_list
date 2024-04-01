import { useFormContext } from 'react-hook-form'
import TextAreaField from '../component'
import ErrorMessage from 'components/Form/ErrorMessage'

export interface TextAreaFieldHookFormWrapperProps {
    label: string
    name: string
}

const TextAreaFieldHookFormWrapper: React.FC<TextAreaFieldHookFormWrapperProps> = ({ label, name }) => {
    const { register, formState } = useFormContext()

    const registered = register(name)

    return (
        <div>
            <TextAreaField
                label={label}
                name={registered.name}
                onChange={registered.onChange}
                onBlur={registered.onBlur}
                componentRef={registered.ref}
            />
            <ErrorMessage error={formState.touchedFields[registered.name] && formState.errors[registered.name]} />
        </div>
    )
}

export default TextAreaFieldHookFormWrapper
