import { useEffect } from 'react'
import { prefetchSingleMenuQuery, useGetMenusQuery } from './queries'

export function usePrefetchMenusCriticalData() {
    const { data: menusData, isSuccess: isMenusSuccess } = useGetMenusQuery()

    useEffect(() => {
        if (!menusData) {
            return
        }

        // Prefetch first 3 menus
        if (menusData.length > 0) {
            prefetchSingleMenuQuery(menusData[0].id.toString())
        }
        if (menusData.length > 1) {
            prefetchSingleMenuQuery(menusData[1].id.toString())
        }
        if (menusData.length > 2) {
            prefetchSingleMenuQuery(menusData[2].id.toString())
        }
    }, [isMenusSuccess])

    return null
}
