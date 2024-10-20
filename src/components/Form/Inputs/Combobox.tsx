import { ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Combobox } from '@headlessui/react'
import { useEffect, useState } from 'react'

interface ComboBoxProps {
    label?: string
    value: string
    setValue: (newValue: string) => void
    options: string[]
    placeholder?: string
}

function getFilteredValues(value: string, options: string[]) {
    return value === ''
        ? options
        : options.filter((option) => option.toLowerCase().replace(/\s+/g, '').includes(value.toLowerCase().replace(/\s+/g, '')))
}

function ComboBox({ label, options, value, setValue, placeholder }: ComboBoxProps) {
    const [filteredValues, setFilteredValues] = useState(getFilteredValues(value, options))

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilteredValues(getFilteredValues(value, options))
        }, 400)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [value])

    return (
        <Combobox value={value} onChange={(value) => setValue(value ?? '')}>
            <div>
                {label ? <label>{label}</label> : ''}
                <div className='relative w-40'>
                    <div>
                        <Combobox.Input
                            className='mb-0 pr-9'
                            displayValue={(option: string) => option}
                            onChange={(event) => setValue(event.target.value)}
                            placeholder={placeholder}
                        />
                        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                            <ChevronUpDownIcon className='h-6 w-6 text-gray-400' aria-hidden='true' />
                        </Combobox.Button>
                    </div>

                    <Combobox.Options className='z-10 absolute mt-2 max-h-60 w-full overflow-auto rounded border bg-white'>
                        {filteredValues.length === 0 && value !== '' ? (
                            <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>Nothing found.</div>
                        ) : (
                            filteredValues.map((option) => (
                                <Combobox.Option
                                    key={option}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary text-white' : 'text-gray-900'}`
                                    }
                                    value={option}
                                >
                                    <span className={'block truncate'}>{option}</span>
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </div>
            </div>
        </Combobox>
    )
}

export default ComboBox
