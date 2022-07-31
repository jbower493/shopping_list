import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from '../containers/dashboard'

function UserRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default UserRouter;
