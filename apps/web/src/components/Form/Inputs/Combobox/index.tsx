import { _Combobox, ComboBoxProps } from './component'
import { _ComboboxHookFormWrapper } from './wrappers/hookForm'

export const Combobox: React.FC<ComboBoxProps> & { HookForm: typeof _ComboboxHookFormWrapper } = Object.assign(_Combobox, {
    HookForm: _ComboboxHookFormWrapper
})
