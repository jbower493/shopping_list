import axios, { AxiosRequestConfig } from 'axios'
import { MutationResponse, QueryResponse } from './types'

export const request = {
    async get<D>(url: string, options?: AxiosRequestConfig<D> | undefined) {
        try {
            const res = await axios.get<QueryResponse<D>>(url, options)
            return res.data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
    async post<D>(url: string, data: D, options?: AxiosRequestConfig<D> | undefined) {
        try {
            const res = await axios.post<MutationResponse>(url, data, options)
            return res.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
    async put<D>(url: string, data: D, options?: AxiosRequestConfig<D> | undefined) {
        try {
            const res = await axios.put<MutationResponse>(url, data, options)
            return res.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
    async delete(url: string, options?: AxiosRequestConfig | undefined) {
        try {
            const res = await axios.get<MutationResponse>(url, options)
            return res.data
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
