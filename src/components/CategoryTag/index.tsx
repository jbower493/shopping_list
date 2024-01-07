import React from 'react'
import { getCategoryColor, getRecipeCategoryColor } from 'utils/functions'
import type { Category } from 'containers/categories/types'
import { RecipeCategory } from 'containers/recipeCategories/types'

interface CategoryTagProps {
    categoriesData: Category[] | RecipeCategory[]
    categoryName: string
    size?: 'sm' | 'md'
    className?: string
    isRecipeCategory?: boolean
}

function CategoryTag({ categoriesData, categoryName, size, className, isRecipeCategory }: CategoryTagProps) {
    const getSize = () => {
        if (size === 'sm') return 'px-2 h-5 text-xs'
        if (size === 'md') return 'px-3 h-6 text-sm'
        return 'px-4 h-7'
    }

    return (
        <div
            key={1}
            className={`flex items-center rounded-full pb-[1px] w-fit ${getSize()} ${
                !isRecipeCategory ? getCategoryColor(categoriesData, categoryName) : getRecipeCategoryColor(categoriesData, categoryName)
            } text-white ${className}`}
        >
            {categoryName}
        </div>
    )
}

export default CategoryTag
