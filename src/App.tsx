import React from "react";
import Auth from './containers/auth'
import { useGetUserQuery } from './containers/auth/api'
import DefaultLoader from './components/Loaders/Default'

function App() {

    const { data, isLoading } = useGetUserQuery()

    function renderApp() {
        if (isLoading) return <DefaultLoader message='Get user' />

        return data ? <div>Logged in</div> : <Auth />
    }

    return (
        <div className="App">
            {renderApp()}
        </div>
    );
}

export default App
