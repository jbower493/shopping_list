import { ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'
import { useClickAway } from 'utils/hooks'

type Options = {
    id: number
    value: string
}[]

type ListProps = {
    options: Options
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

type ComboBoxProps = {
    label?: string
    value: string
    setValue: (newValue: string) => void
    options: Options
    placeholder?: string
}

function getFilteredValues(value: string, options: Options): Options {
    return value === ''
        ? options
        : options.filter((option) => option.value.toLowerCase().replace(/\s+/g, '').includes(value.toLowerCase().replace(/\s+/g, '')))
}

export function Combobox({ value, setValue, options, placeholder = '' }: ComboBoxProps) {
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

    useClickAway([comboboxRef], () => setShowList(false))

    return (
        <div ref={comboboxRef} className='relative w-40'>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                onFocus={() => setShowList(true)}
                className='pr-7'
            />
            <button className='absolute right-0 top-1/2 -translate-y-1/2 p-1' onClick={onChevronClick}>
                <ChevronUpDownIcon className='w-6 text-gray-400' />
            </button>
            {showList && <List onOptionSelect={onOptionSelect} options={filteredOptions} />}
        </div>
    )
}
