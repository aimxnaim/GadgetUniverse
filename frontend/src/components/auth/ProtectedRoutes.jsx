import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loader from '../layout/Loader'
import toast from 'react-hot-toast'

const ProtectedRoutes = ({ admin, children }) => {
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth)
    const toastShownRef = useRef(false)

    useEffect(() => {
        if (user?.role !== 'admin' && admin && !toastShownRef.current) {
            toast.error('You are not authorized to access this route')
            toastShownRef.current = true
        }
    }, [user, admin])

    if (loading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (admin && user?.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoutes
