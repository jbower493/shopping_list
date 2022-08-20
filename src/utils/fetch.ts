import { baseUrl } from '../config'

export const getRequest = async <T>(url: string): Promise<T> => {
    const response = await fetch(`${baseUrl}${url}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const data = await response.json()
        return data
    }

    const error = await response.json()
    throw { ...error, status: response.status }
}

export const postRequest = async <TReturn>(url: string, body: BodyInit): Promise<TReturn> => {
    const response = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body
    })

    if (response.ok) {
        const data = await response.json()
        return data
    }

    const error = await response.json()
    throw { ...error, status: response.status }
}
