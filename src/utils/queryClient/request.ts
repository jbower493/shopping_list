import axios from 'axios'
import { MutationResponse, QueryResponse } from './types'

export const request = {
    async get<T>(url: string) {
        try {
            const res = await axios.get<QueryResponse<T>>(url)
            return res.data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
    async post<D>(url: string, data: D) {
        try {
            const res = await axios.post<MutationResponse>(url, data)
            return res.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
    async put<D>(url: string, data: D) {
        try {
            const res = await axios.put<MutationResponse>(url, data)
            return res.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
    async delete(url: string) {
        try {
            const res = await axios.get<MutationResponse>(url)
            return res.data
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
