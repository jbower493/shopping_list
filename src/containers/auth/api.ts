import fetch from '../../utils/fetch'
import type { Credentials } from './models'

export const getUser = () => fetch('/user')

export const register = (credentials: Credentials) => fetch('/register', {
    method: 'POST',
    body: JSON.stringify(credentials)
})

export const login = (credentials: Credentials) => fetch('/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
})

export const logout = () => fetch('/logout')
