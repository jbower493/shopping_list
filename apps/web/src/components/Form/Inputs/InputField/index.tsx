import InputField, { InputFieldProps } from './component'
import InputFieldHookFormWrapper from './wrappers/hookForm'

const Component: React.FC<InputFieldProps> & { HookForm: typeof InputFieldHookFormWrapper } = Object.assign(InputField, {
    HookForm: InputFieldHookFormWrapper
})

export default Component
