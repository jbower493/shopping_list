import React from 'react'
import { ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Combobox } from '@headlessui/react'

interface ComboBoxProps {
    value: string
    setValue: (newValue: string) => void
    options: string[]
}

function ComboBox({ options, value, setValue }: ComboBoxProps) {
    const filteredValues =
        value === ''
            ? options
            : options.filter((option) => option.toLowerCase().replace(/\s+/g, '').includes(value.toLowerCase().replace(/\s+/g, '')))

    return (
        <Combobox value={value} onChange={setValue}>
            <div className='ComboBox relative w-60 mb-0 mr-4'>
                <div>
                    <Combobox.Input
                        className='mb-0 pr-9'
                        displayValue={(option: string) => option}
                        onChange={(event) => setValue(event.target.value)}
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
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary text-white' : 'text-gray-900'}`
                                }
                                value={option}
                            >
                                <span className={'block truncate'}>{option}</span>
                            </Combobox.Option>
                        ))
                    )}
                </Combobox.Options>
            </div>
        </Combobox>
    )
}

export default ComboBox
