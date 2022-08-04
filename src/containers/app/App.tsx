import React from "react";
import { useQuery } from '@tanstack/react-query'
import UserRouter from "../../router/user";
import GuestRouter from "../../router/guest";
import DefaultLoader from "../../components/Loaders/Default";

import { authApi } from '../auth/api'

function App() {
    const { data, isLoading, isError } = useQuery(['user'], authApi.getUser)
    console.log(isLoading)
    // function renderApp() {
    //     if (isLoading) return <DefaultLoader message="Get user" />;
    //     if (!data || isError) return <GuestRouter />;
    //     return <UserRouter />;
    // }

    // return <div className="App">{renderApp()}</div>;
    return <div>app</div>
}

export default App;
