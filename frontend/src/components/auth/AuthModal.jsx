import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../actions/api/authApi'
import { useRegisterMutation } from '../../actions/api/authApi'
import { useForgotPasswordMutation } from '../../actions/api/userApi'
import toast from 'react-hot-toast'
import PasswordStrength from './PasswordStrength'
import PasswordRequirements from './PasswordRequirements'

const AuthModal = ({ isOpen, onClose, initialView = 'login', redirectPath = null }) => {
    const [currentView, setCurrentView] = useState(initialView)

    useEffect(() => {
        setCurrentView(initialView)
    }, [initialView])

    if (!isOpen) return null

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const renderView = () => {
        switch (currentView) {
            case 'register':
                return <RegisterForm onSwitchView={setCurrentView} onClose={onClose} redirectPath={redirectPath} />
            case 'forgot':
                return <ForgotPasswordForm onSwitchView={setCurrentView} onClose={onClose} />
            default:
                return <LoginForm onSwitchView={setCurrentView} onClose={onClose} redirectPath={redirectPath} />
        }
    }

    return (
        <div className="auth-modal-overlay" onClick={handleOverlayClick}>
            <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                {renderView()}
            </div>
        </div>
    )
}

// Login Form Component
const LoginForm = ({ onSwitchView, onClose, redirectPath }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const [login, { isLoading, error, data }] = useLoginMutation()
    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            toast.success('Logged in successfully')
            onClose()
            if (redirectPath) {
                navigate(redirectPath)
            }
        }
        if (error) toast.error(error?.data?.message)
    }, [error, isAuthenticated, data, navigate, onClose, redirectPath])

    const submitHandler = (e) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error('Please fill in all fields')
            return
        }
        login({ email, password })
    }

    return (
        <div className="auth-modal-split">
            <div className="auth-modal-form-section">
                <div className="auth-modal-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account</p>
                </div>

                <form onSubmit={submitHandler} className="auth-modal-form">
                    <div className="form-group-modal">
                        <label><i className="fas fa-envelope"></i> Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group-modal">
                        <label><i className="fas fa-lock"></i> Password</label>
                        <div className="password-input-modal">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <button type="button" className="link-btn" onClick={() => onSwitchView('forgot')}>
                        Forgot Password?
                    </button>

                    <button type="submit" className="btn-modal-primary" disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>

                    <div className="modal-divider">
                        <span>Don't have an account?</span>
                    </div>

                    <button type="button" className="btn-modal-secondary" onClick={() => onSwitchView('register')}>
                        Create Account
                    </button>
                </form>
            </div>

            <div className="auth-modal-visual-section">
                <div className="visual-content">
                    <i className="fas fa-lock"></i>
                    <h3>Secure Login</h3>
                    <p>Access your account securely</p>
                </div>
            </div>
        </div>
    )
}

// Register Form Component
const RegisterForm = ({ onSwitchView, onClose, redirectPath }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const [register, { isLoading, error, data }] = useRegisterMutation()
    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            toast.success('Account created successfully!')
            onClose()
            if (redirectPath) {
                navigate(redirectPath)
            }
        }
        if (error) toast.error(error?.data?.message)
    }, [error, isAuthenticated, data, navigate, onClose, redirectPath])

    const submitHandler = (e) => {
        e.preventDefault()
        if (!name || !email || !password) {
            toast.error('Please fill in all fields')
            return
        }
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters')
            return
        }
        register({ name, email, password })
    }

    return (
        <div className="auth-modal-split">
            <div className="auth-modal-form-section">
                <div className="auth-modal-header">
                    <h2>Create Account</h2>
                    <p>Join us today and start shopping</p>
                </div>

                <form onSubmit={submitHandler} className="auth-modal-form">
                    <div className="form-group-modal">
                        <label><i className="fas fa-user"></i> Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group-modal">
                        <label><i className="fas fa-envelope"></i> Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group-modal">
                        <label><i className="fas fa-lock"></i> Password</label>
                        <div className="password-input-modal">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                required
                            />
                            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        <PasswordStrength password={password} />
                    </div>

                    <PasswordRequirements password={password} />

                    <button type="submit" className="btn-modal-primary" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div className="modal-divider">
                        <span>Already have an account?</span>
                    </div>

                    <button type="button" className="btn-modal-secondary" onClick={() => onSwitchView('login')}>
                        Sign In
                    </button>
                </form>
            </div>

            <div className="auth-modal-visual-section">
                <div className="visual-content">
                    <i className="fas fa-user-plus"></i>
                    <h3>Join Us Today</h3>
                    <p>Create your account and start shopping</p>
                </div>
            </div>
        </div>
    )
}

// Forgot Password Form Component
const ForgotPasswordForm = ({ onSwitchView, onClose }) => {
    const [email, setEmail] = useState('')
    const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation()

    useEffect(() => {
        if (error) toast.error(error?.data?.message)
        if (isSuccess) {
            toast.success('Reset link sent to your email!')
            setTimeout(() => onSwitchView('login'), 2000)
        }
    }, [error, isSuccess, onSwitchView])

    const submitHandler = (e) => {
        e.preventDefault()
        if (!email) {
            toast.error('Please enter your email')
            return
        }
        forgotPassword({ email })
    }

    return (
        <div className="auth-modal-split">
            <div className="auth-modal-form-section">
                <div className="auth-modal-header">
                    <h2>Forgot Password?</h2>
                    <p>Enter your email to reset your password</p>
                </div>

                <form onSubmit={submitHandler} className="auth-modal-form">
                    <div className="form-group-modal">
                        <label><i className="fas fa-envelope"></i> Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        <small className="form-note">
                            <i className="fas fa-info-circle"></i> We'll send a reset link to your email
                        </small>
                    </div>

                    <button type="submit" className="btn-modal-primary" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>

                    <div className="modal-divider">
                        <span>Remember your password?</span>
                    </div>

                    <button type="button" className="btn-modal-secondary" onClick={() => onSwitchView('login')}>
                        Back to Sign In
                    </button>
                </form>
            </div>

            <div className="auth-modal-visual-section">
                <div className="visual-content">
                    <i className="fas fa-key"></i>
                    <h3>Reset Password</h3>
                    <p>We'll help you get back to your account</p>
                </div>
            </div>
        </div>
    )
}

export default AuthModal
