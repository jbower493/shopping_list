import { useState, useEffect } from 'react'

function getFromSessionStorage<t>(key: string, defaultValue: t) {
    const stored = sessionStorage.getItem(key)

    if (!stored) return defaultValue
    return JSON.parse(stored)
}

export function useSessionStorage<t>(key: string, defaultValue: t) {
    const [value, setValue] = useState<t | null>(getFromSessionStorage<t>(key, defaultValue))

    const setSessionStorage = (newValue: t | null) => sessionStorage.setItem(key, JSON.stringify(newValue))

    useEffect(() => {
        setSessionStorage(value)
    }, [value])

    return { value, setValue }
}
