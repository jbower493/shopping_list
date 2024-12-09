import { prefetchGetCategoriesQuery } from 'containers/categories/queries'
import { prefetchGetItemsQuery } from 'containers/items/queries'
import { prefetchListsQuery } from 'containers/lists/queries'
import { prefetchGetMenusQuery } from 'containers/menus/queries'
import { prefetchGetRecipeCategoriesQuery } from 'containers/recipeCategories/queries'
import { prefetchGetRecipesQuery } from 'containers/recipes/queries'
import { useState, useEffect } from 'react'

function getFromLocalStorage<t>(key: string, defaultValue: t) {
    const stored = localStorage.getItem(key)

    if (!stored) return defaultValue
    return JSON.parse(stored)
}

export function useLocalStorage<t>(key: string, defaultValue: t) {
    const [value, setValue] = useState<t | null>(getFromLocalStorage<t>(key, defaultValue))

    const setLocalStorage = (newValue: t | null) => localStorage.setItem(key, JSON.stringify(newValue))

    useEffect(() => {
        setLocalStorage(value)
    }, [value])

    return { value, setValue }
}

export function usePrefetchAppCriticalData() {
    useEffect(() => {
        prefetchListsQuery()
        prefetchGetRecipesQuery()
        prefetchGetRecipeCategoriesQuery()
        prefetchGetMenusQuery()
        prefetchGetCategoriesQuery()
        prefetchGetItemsQuery()
    }, [])

    return null
}

export function useClickAway(refs: React.MutableRefObject<HTMLElement | null>[], onClickAway: () => void) {
    function handleClickAway(e: MouseEvent) {
        if (!refs || refs.length <= 0) {
            return
        }

        if (!refs.some((ref) => !ref.current || ref.current.contains(e.target as Node))) {
            onClickAway()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickAway)

        return () => document.removeEventListener('click', handleClickAway)
    }, [])

    return null
}
