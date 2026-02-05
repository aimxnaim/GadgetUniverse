/* Example: How to use AuthModal from any component */

import React, { useState } from 'react'
import AuthModal from '../components/auth/AuthModal'

const ExampleComponent = () => {
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [authView, setAuthView] = useState('login') // 'login', 'register', or 'forgot'

    const openLogin = () => {
        setAuthView('login')
        setShowAuthModal(true)
    }

    const openRegister = () => {
        setAuthView('register')
        setShowAuthModal(true)
    }

    const openForgotPassword = () => {
        setAuthView('forgot')
        setShowAuthModal(true)
    }

    return (
        <div>
            {/* Trigger buttons */}
            <button onClick={openLogin}>Login</button>
            <button onClick={openRegister}>Sign Up</button>
            <button onClick={openForgotPassword}>Forgot Password</button>

            {/* Auth Modal */}
            <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)} 
                initialView={authView} 
            />
        </div>
    )
}

export default ExampleComponent
