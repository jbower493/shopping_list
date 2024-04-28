export interface QueryResponse<T> {
    message: string
    data: T
}

// eslint-disable-next-line
export interface MutationResponse<T = any> {
    message: string
    data?: T
}
