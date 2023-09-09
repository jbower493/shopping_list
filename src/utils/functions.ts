import type { Category } from 'containers/categories/types'
import type { Item } from 'containers/items/types'

export const getCategoryOptions = (categories: Category[] = []) => {
    const options = categories.map(({ id, name }) => ({
        label: name,
        value: id.toString()
    }))

    return [{ label: 'Uncategorized', value: 'none' }, ...options]
}

export const getCategoryColor = (categories: Category[], catName: string) => {
    const index = categories.findIndex(({ name }) => catName === name)
    const num = index % 6

    switch (num) {
        case 0:
            return 'bg-red-500'
        case 1:
            return 'bg-orange-500'
        case 2:
            return 'bg-lime-500'
        case 3:
            return 'bg-sky-500'
        case 4:
            return 'bg-fuchsia-500'
        case 5:
            return 'bg-indigo-500'
        default:
            return 'bg-gray-400'
    }
}

export const getExistingCategories = (itemsList: Item[]) => {
    const mapped = itemsList.map(({ category }) => category || { name: 'Uncategorized', id: -1 })
    const filtered = mapped.filter((category, index, arr) => arr.findIndex((categoryNested) => category.id === categoryNested.id) === index)
    const sorted = filtered.sort((a, b) => {
        if (b.id === -1) return -1
        if (a.id === -1) return 1
        return a.name.localeCompare(b.name)
    })

    return sorted
}
