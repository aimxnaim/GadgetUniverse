import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoutes from '../auth/ProtectedRoutes'
import Dashboard from '../admin/Dashboard'

const adminRoutes = () => {
    return (
        <>
            <Route
                path='/admin/dashboard'
                element={
                    <ProtectedRoutes admin={true}>
                        <Dashboard />
                    </ProtectedRoutes>
                } />
        </>
    )
}

export default adminRoutes