import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import UserRouter from '../../router/user'
import GuestRouter from '../../router/guest'
import DefaultLoader from '../../components/Loaders/Default'
import { getUser } from '../auth/api'

const AppWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

function App() {
    const { data, isLoading, isError, isRefetching } = useQuery(['user'], getUser)

    function renderApp() {
        if (isLoading || isRefetching) return <DefaultLoader message='Get user' />
        if (!data || isError) return <GuestRouter />
        return <UserRouter />
    }

    return <AppWrapper className='App'>{renderApp()}</AppWrapper>
}

export default App
