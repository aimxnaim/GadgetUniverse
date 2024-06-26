import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoutes from '../auth/ProtectedRoutes'
import Dashboard from '../admin/Dashboard'
import ListProducts from '../admin/ListProducts'
import NewProduct from '../admin/NewProduct'
import UpdateProduct from '../admin/UpdateProduct'
import UploadImages from '../admin/UploadImages'
import ListOrders from '../admin/ListOrders'
import ProcessOrders from '../admin/ProcessOrders'

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

            <Route
                path='/admin/products/:id'
                element={
                    <ProtectedRoutes admin={true}>
                        <UpdateProduct />
                    </ProtectedRoutes>
                } />

            <Route
                path='/admin/products/:id/upload_images'
                element={
                    <ProtectedRoutes admin={true}>
                        <UploadImages />
                    </ProtectedRoutes>
                } />

            <Route
                path='/admin/orders'
                element={
                    <ProtectedRoutes admin={true}>
                        <ListOrders />
                    </ProtectedRoutes>
                } />

            <Route
                path='/admin/orders/:id'
                element={
                    <ProtectedRoutes admin={true}>
                        <ProcessOrders />
                    </ProtectedRoutes>
                } />
        </>
    )
}

export default adminRoutes