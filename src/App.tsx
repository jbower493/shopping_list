import React from "react";
import { useGetUserQuery } from "./containers/auth/api";
import UserRouter from "./router/user";
import GuestRouter from "./router/guest";
import DefaultLoader from "./components/Loaders/Default";

function App() {
    const { data, isLoading, isError } = useGetUserQuery();

    function renderApp() {
        if (isLoading) return <DefaultLoader message="Get user" />;
        if (!data || isError) return <GuestRouter />;
        return <UserRouter />;
    }

    return <div className="App">{renderApp()}</div>;
}

export default App;
