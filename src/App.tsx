import React from "react";
import Auth from './containers/auth'
import { useGetUserQuery } from './containers/auth/api'

function App() {

    const { data } = useGetUserQuery()

    console.log(data)

    function renderApp() {
        return data ? <div>Logged in</div> : <Auth />
    }

    return (
        <div className="App">
            {renderApp()}
        </div>
    );
}

export default App
