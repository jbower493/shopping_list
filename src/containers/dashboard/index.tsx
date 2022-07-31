import React from "react";
import { useLogoutMutation } from "../auth/api";

function Dashboard() {
    const [logout, { isLoading }] = useLogoutMutation();

    return (
        <div>
            <h2>Dashboard</h2>
            {isLoading ? (
                <div>Logging out...</div>
            ) : (
                <button type="button" onClick={() => logout()}>
                    Logout
                </button>
            )}
        </div>
    );
}

export default Dashboard;
