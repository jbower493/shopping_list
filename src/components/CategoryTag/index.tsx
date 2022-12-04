import React from 'react'
import { getCategoryColor } from 'utils/functions'
import type { Category } from 'containers/categories/types'

interface CategoryTagProps {
    categoriesData: Category[]
    categoryName: string
    size?: 'sm' | 'md'
    className?: string
}

function CategoryTag({ categoriesData, categoryName, size, className }: CategoryTagProps) {
    const getSize = () => {
        if (size === 'sm') return 'px-2 h-5 text-xs'
        if (size === 'md') return 'px-3 h-6 text-sm'
        return 'px-4 h-7'
    }

    return (
        <div
            key={1}
            className={`flex items-center rounded-full pb-[1px] w-fit ${getSize()} ${getCategoryColor(
                categoriesData,
                categoryName
            )} text-white ${className}`}
        >
            {categoryName}
        </div>
    )
}

export default CategoryTag
