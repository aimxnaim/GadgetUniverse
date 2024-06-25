import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoutes from '../auth/ProtectedRoutes'
import Dashboard from '../admin/Dashboard'
import ListProducts from '../admin/ListProducts'
import NewProduct from '../admin/NewProduct'

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

            <Route
                path='/admin/products'
                element={
                    <ProtectedRoutes admin={true}>
                        <ListProducts />
                    </ProtectedRoutes>
                } />

            <Route
                path='/admin/product/new'
                element={
                    <ProtectedRoutes admin={true}>
                        <NewProduct />
                    </ProtectedRoutes>
                } />
        </>
    )
}

export default adminRoutes