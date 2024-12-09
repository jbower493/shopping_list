import { useController } from 'react-hook-form'
import { _Combobox, ComboboxOptions } from '../component'
import ErrorMessage from 'components/Form/ErrorMessage'

export interface ComboboxHookFormWrapperProps {
    label?: string
    name: string
    options: ComboboxOptions
    className?: string
    listClassName?: string
    placeholder?: string
}

export const _ComboboxHookFormWrapper: React.FC<ComboboxHookFormWrapperProps> = ({
    label,
    name,
    options,
    className,
    listClassName,
    placeholder = 'Item name'
}) => {
    const { field, fieldState } = useController({ name })

    return (
        <div>
            <_Combobox
                className={className}
                listClassName={listClassName}
                label={label}
                value={field.value}
                setValue={(newValue) => field.onChange(newValue)}
                options={options}
                placeholder={placeholder}
                onBlur={field.onBlur}
            />
            <ErrorMessage error={fieldState.isTouched && fieldState.error} />
        </div>
    )
}
