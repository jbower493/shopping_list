export interface User {
    id: string
    name: string
    email: string
}

export interface Credentials {
    email: string
    password: string
}

export interface RegisterCredentials extends Credentials {
    name: string
}
