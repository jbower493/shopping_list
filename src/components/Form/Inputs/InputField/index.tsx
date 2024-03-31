import InputField, { InputFieldProps } from './component'
import InputFieldHookFormWrapper, { InputFieldHookFormWrapperProps } from './wrappers/hookForm'

const Component: React.FC<InputFieldProps> & { HookForm: React.FC<InputFieldHookFormWrapperProps> } = Object.assign(InputField, {
    HookForm: InputFieldHookFormWrapper
})

export default Component
