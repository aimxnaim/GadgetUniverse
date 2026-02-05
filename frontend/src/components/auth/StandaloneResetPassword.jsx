import React, { useEffect, useState } from 'react'
import { useResetPasswordMutation } from '../../actions/api/userApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import StandaloneAuthLayout from '../layout/StandaloneAuthLayout'
import PasswordStrength from './PasswordStrength'
import PasswordRequirements from './PasswordRequirements'

const StandaloneResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation()

    const navigate = useNavigate()
    const params = useParams()

    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        isAuthenticated && navigate('/')
        error && toast.error(error?.data?.message)
        if (isSuccess) {
            toast.success('Password reset successfully. Please login with your new password.')
            navigate('/auth/login')
        }
    }, [error, isAuthenticated, isSuccess, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return toast.error('Passwords do not match. Please try again.')
        }

        if (password.length < 8) {
            return toast.error('Password must be at least 8 characters long')
        }

        const data = { password, confirmPassword }
        resetPassword({ body: data, token: params?.token })
    }

    return (
        <StandaloneAuthLayout title="Reset Password">
            <div className="standalone-auth-card">
                <div className="auth-icon-container">
                    <div className="auth-icon">
                        <i className="fas fa-lock-open"></i>
                    </div>
                </div>
                
                <h2 className="auth-title">Reset Password</h2>
                <p className="auth-subtitle">Create a new password for your account</p>

                <form onSubmit={submitHandler} className="standalone-auth-form">
                    <div className="form-group-standalone">
                        <label htmlFor="password_field" className="form-label-standalone">
                            <i className="fas fa-lock me-2"></i>
                            New Password
                        </label>
                        <div className="password-input-wrapper-standalone">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password_field"
                                className="form-control-standalone"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your new password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        <PasswordStrength password={password} />
                    </div>

                    <div className="form-group-standalone">
                        <label htmlFor="confirm_password_field" className="form-label-standalone">
                            <i className="fas fa-lock me-2"></i>
                            Confirm New Password
                        </label>
                        <div className="password-input-wrapper-standalone">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm_password_field"
                                className="form-control-standalone"
                                name="confirm_password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your new password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <PasswordRequirements password={password} />

                    <button
                        type="submit"
                        className="btn-auth-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Resetting Password...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-check me-2"></i>
                                Reset Password
                            </>
                        )}
                    </button>

                    <div className="auth-divider">
                        <span>OR</span>
                    </div>

                    <Link to="/auth/login" className="btn-auth-secondary">
                        <i className="fas fa-arrow-left me-2"></i>
                        Back to Sign In
                    </Link>

                    <div className="auth-footer">
                        <Link to="/" className="back-to-home">
                            <i className="fas fa-home me-2"></i>
                            Back to Home
                        </Link>
                    </div>
                </form>
            </div>
        </StandaloneAuthLayout>
    )
}

export default StandaloneResetPassword
