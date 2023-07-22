export interface QueryResponse<T> {
    message: string
    data: T
}

export interface MutationResponse {
    message: string
}

export interface ErrorResponse {
    errors: string[]
}
