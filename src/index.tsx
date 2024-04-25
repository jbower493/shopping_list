import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from 'containers/app'
import reportWebVitals from './reportWebVitals'
import axios from 'axios'
import { baseUrl } from 'config'
import { queryClient } from 'utils/queryClient'
import 'drag-drop-touch'

axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use((response) => {
    return response.data
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
