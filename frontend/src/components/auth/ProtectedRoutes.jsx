import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../layout/Loader'
import AuthModal from './AuthModal'

const ProtectedRoutes = ({ admin, children }) => {
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            setShowAuthModal(true)
        }
    }, [isAuthenticated, loading])

    useEffect(() => {
        if (isAuthenticated) {
            setShowAuthModal(false)
        }
    }, [isAuthenticated])

    if (loading) {
        return <Loader />
    }

    if (admin && user?.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return (
        <>
            {isAuthenticated ? children : <div style={{ minHeight: '60vh' }} />}
            <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)} 
                initialView="login"
                redirectPath={location.pathname}
            />
        </>
    )
}

export default ProtectedRoutes
