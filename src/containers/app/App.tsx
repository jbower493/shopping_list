import React from 'react'
import useSwr from 'swr'
import { ChakraProvider } from '@chakra-ui/react'
import UserRouter from '../../router/user'
import GuestRouter from '../../router/guest'
import { getRequest } from 'utils/fetch'

function App() {
    const { data, error } = useSwr('/user', getRequest)
console.log(data, error)
    function renderApp() {
        if (!data && !error) return <h1>Loading...</h1>
        if (error) return <GuestRouter />
        return <UserRouter />
    }

    return (
        <ChakraProvider>
            <div className='App'>{renderApp()}</div>
        </ChakraProvider>
    )
}

export default App
