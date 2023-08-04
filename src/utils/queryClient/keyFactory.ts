import { User } from 'containers/auth/types'
import { queryClient } from '.'
import { QueryResponse } from './types'

export class QueryKeySet {
    entityName: string

    constructor(entityName: string) {
        this.entityName = entityName

        this.many = this.many.bind(this)
        this.one = this.one.bind(this)
    }

    private getUserIdKeySegment(): string {
        const userData = queryClient.getQueryData<{ data: QueryResponse<{ user: User }> }>(['User'])
        const userId = userData?.data?.data?.user?.id

        return userId ? `USER_${userId}` : 'NO_USER'
    }

    many(): string[] {
        return [this.getUserIdKeySegment(), this.entityName]
    }

    one(entityId: string): string[] {
        return [...this.many(), entityId]
    }
}
