import { useEffect } from 'react'
import { prefetchSingleListQuery, useListsQuery } from './queries'

export function usePrefetchListsCriticalData() {
    const { data: listsData, isSuccess: isListsSuccess } = useListsQuery()

    useEffect(() => {
        if (!listsData) {
            return
        }

        // Prefetch first 3 lists
        if (listsData.length > 0) {
            prefetchSingleListQuery(listsData[0].id.toString())
        }
        if (listsData.length > 1) {
            prefetchSingleListQuery(listsData[1].id.toString())
        }
        if (listsData.length > 2) {
            prefetchSingleListQuery(listsData[2].id.toString())
        }
    }, [isListsSuccess])

    return null
}
