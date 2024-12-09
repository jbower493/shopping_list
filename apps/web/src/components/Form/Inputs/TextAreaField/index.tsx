import TextAreaField, { TextAreaFieldProps } from './component'
import TextAreaFieldHookFormWrapper, { TextAreaFieldHookFormWrapperProps } from './wrappers/hookForm'

const Component: React.FC<TextAreaFieldProps> & { HookForm: React.FC<TextAreaFieldHookFormWrapperProps> } = Object.assign(TextAreaField, {
    HookForm: TextAreaFieldHookFormWrapper
})

export default Component
