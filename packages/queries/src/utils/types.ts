export interface QueryResponse<T> {
    message: string;
    data: T;
}

export interface MutationResponse<T = any> {
    message: string;
    data?: T;
}
