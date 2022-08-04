import React from "react";

function Dashboard() {

    return (
        <div>
            <h2>Dashboard</h2>
            {'isLoading' ? (
                <div>Logging out...</div>
            ) : (
                <button type="button" onClick={() => console.log()}>
                    Logout
                </button>
            )}
        </div>
    );
}

export default Dashboard;
