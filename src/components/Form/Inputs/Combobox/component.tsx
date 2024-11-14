import { ChevronUpDownIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

export type ComboboxOptions = {
    id: number
    value: string
}[]

type ListProps = {
    options: ComboboxOptions
    onOptionSelect: (newValue: string) => void
}

function List({ options, onOptionSelect }: ListProps) {
    return (
        <div className='z-10 absolute top-full mt-2 w-full max-h-60 overflow-auto rounded border bg-white'>
            {options.length > 0 ? (
                options.map(({ id, value }) => {
                    return (
                        <li key={id} className='list-none h-10'>
                            <button
                                onClick={() => onOptionSelect(value)}
                                className='h-full w-full text-left px-2 hover:bg-primary hover:text-white leading-none'
                            >
                                {value}
                            </button>
                        </li>
                    )
                })
            ) : (
                <div className='h-10 flex w-full px-2 items-center'>Nothing found.</div>
            )}
        </div>
    )
}

export type ComboBoxProps = {
    label?: string
    value: string
    setValue: (newValue: string) => void
    options: ComboboxOptions
    placeholder?: string
    onBlur?: () => void
    className?: string
}

function getFilteredValues(value: string, options: ComboboxOptions): ComboboxOptions {
    return value === ''
        ? options
        : options.filter((option) => option.value.toLowerCase().replace(/\s+/g, '').includes(value.toLowerCase().replace(/\s+/g, '')))
}

export function _Combobox({ label, value, setValue, options, placeholder = '', onBlur, className }: ComboBoxProps) {
    const comboboxRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [showList, setShowList] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState(getFilteredValues(value, options))

    function onChevronClick() {
        setShowList((prev) => !prev)
        inputRef.current?.focus()
    }

    function onOptionSelect(newValue: string) {
        setValue(newValue)
        setShowList(false)
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilteredOptions(getFilteredValues(value, options))
        }, 400)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [value, options])

    return (
        <div>
            {label ? <label>{label}</label> : ''}
            <div ref={comboboxRef} className={classNames('relative w-40', className)}>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    onFocus={() => setShowList(true)}
                    onBlur={() => {
                        // Have to use this to to close the list instead of useClickAway, because useClickAway doesn't work inside of a modal for some reason
                        setTimeout(() => {
                            onBlur?.()
                            setShowList(false)
                        }, 100)
                    }}
                    className='pr-7'
                />
                <button type='button' className='absolute right-0 top-1/2 -translate-y-1/2 p-1' onClick={onChevronClick}>
                    <ChevronUpDownIcon className='w-6 text-gray-400' />
                </button>
                {showList && <List onOptionSelect={onOptionSelect} options={filteredOptions} />}
            </div>
        </div>
    )
}
