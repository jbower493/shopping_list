import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { QueryKeySet } from 'utils/queryClient/keyFactory'
import type { QueryResponse } from 'utils/queryClient/types'
import { QuantityUnit } from './types'

const quantityUnitsKeySet = new QueryKeySet('QuantityUnit')

/***** Get quantity units *****/
export const getQuantityUnits = (): Promise<QueryResponse<{ quantity_units: QuantityUnit[] }>> => axios.get('/quantity-unit')
export const quantityUnitsQueryKey = quantityUnitsKeySet.many

export function useQuantityUnitsQuery() {
    return useQuery({
        queryKey: quantityUnitsQueryKey(),
        queryFn: getQuantityUnits,
        select: (res) => res.data.quantity_units
    })
}
