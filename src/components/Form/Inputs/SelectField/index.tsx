import { SelectFieldProps, _SelectField } from './component'
import SelectFieldHookFormWrapper, { SelectFieldHookFormWrapperProps } from './wrappers/hookForm'

const Component: React.FC<SelectFieldProps> & { HookForm: React.FC<SelectFieldHookFormWrapperProps> } = Object.assign(_SelectField, {
    HookForm: SelectFieldHookFormWrapper
})

export default Component
