import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from 'containers/app/app'
import reportWebVitals from './reportWebVitals'
import axios, { isAxiosError } from 'axios'
import { baseUrl } from 'config'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import { ErrorResponse } from 'utils/api/types'
import { toast } from 'react-hot-toast'

axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        },
        mutations: {
            onError: (err) => {
                if (!isAxiosError(err)) return

                const errorResponseData = err.response?.data

                function isErrorsArray(something: any): something is ErrorResponse {
                    return typeof (something as ErrorResponse).errors?.[0] === 'string'
                }

                if (!isErrorsArray(errorResponseData)) return

                toast.error(errorResponseData.errors[0])
            }
        }
    }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
