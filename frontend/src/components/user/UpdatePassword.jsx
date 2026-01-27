import React, { useEffect, useState } from 'react'
import UserLayout from '../layout/UserLayout'
import { useUpdatePasswordMutation } from '../../actions/api/userApi'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate()

    const [updatePassword, { isLoading, error, isSuccess }] =
        useUpdatePasswordMutation()

    useEffect(() => {

        error && toast.error(error?.data?.message)

        if (isSuccess) {
            toast.success('Password updated successfully')
            navigate('/me/profile')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isSuccess])

    const getPasswordStrength = (password) => {
        if (!password) return { strength: '', color: '', width: '0%' }
        
        let strength = 0
        if (password.length >= 8) strength++
        if (password.length >= 12) strength++
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        if (/[^a-zA-Z0-9]/.test(password)) strength++

        if (strength <= 2) return { strength: 'Weak', color: '#ff4444', width: '33%' }
        if (strength <= 3) return { strength: 'Medium', color: '#ffaa00', width: '66%' }
        return { strength: 'Strong', color: '#00cc66', width: '100%' }
    }

    const passwordStrength = getPasswordStrength(newPassword)

    const submitHandler = (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters long')
            return
        }

        // Create userData object
        const userData = {
            oldPassword,
            newPassword
        }

        // Dispatch updatePassword action
        updatePassword(userData)
    }

    return (
        <UserLayout>
            <div className="profile-form-container">
                <div className="profile-form-card">
                    <div className="form-header">
                        <div className="form-icon">
                            <i className="fas fa-key"></i>
                        </div>
                        <h2 className="form-title">Update Password</h2>
                        <p className="form-subtitle">Ensure your account is using a strong password</p>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className="form-group-enhanced">
                            <label htmlFor="old_password_field" className="form-label-enhanced">
                                <i className="fas fa-lock me-2"></i>
                                Current Password
                            </label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    id="old_password_field"
                                    className="form-control-enhanced"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Enter your current password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                >
                                    <i className={`fas ${showOldPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="form-group-enhanced">
                            <label htmlFor="new_password_field" className="form-label-enhanced">
                                <i className="fas fa-lock me-2"></i>
                                New Password
                            </label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    id="new_password_field"
                                    className="form-control-enhanced"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter your new password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    <i className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                            {newPassword && (
                                <div className="password-strength">
                                    <div className="strength-bar">
                                        <div 
                                            className="strength-fill" 
                                            style={{ 
                                                width: passwordStrength.width,
                                                backgroundColor: passwordStrength.color 
                                            }}
                                        ></div>
                                    </div>
                                    <span className="strength-text" style={{ color: passwordStrength.color }}>
                                        {passwordStrength.strength}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="form-group-enhanced">
                            <label htmlFor="confirm_password_field" className="form-label-enhanced">
                                <i className="fas fa-lock me-2"></i>
                                Confirm New Password
                            </label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm_password_field"
                                    className="form-control-enhanced"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your new password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                            {confirmPassword && newPassword !== confirmPassword && (
                                <small className="text-danger">
                                    <i className="fas fa-exclamation-circle me-1"></i>
                                    Passwords do not match
                                </small>
                            )}
                        </div>

                        <div className="password-requirements">
                            <p className="requirements-title">
                                <i className="fas fa-info-circle me-2"></i>
                                Password Requirements:
                            </p>
                            <ul className="requirements-list">
                                <li className={newPassword.length >= 8 ? 'valid' : ''}>
                                    <i className={`fas ${newPassword.length >= 8 ? 'fa-check-circle' : 'fa-circle'}`}></i>
                                    At least 8 characters
                                </li>
                                <li className={/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'valid' : ''}>
                                    <i className={`fas ${/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'fa-check-circle' : 'fa-circle'}`}></i>
                                    Upper and lowercase letters
                                </li>
                                <li className={/\d/.test(newPassword) ? 'valid' : ''}>
                                    <i className={`fas ${/\d/.test(newPassword) ? 'fa-check-circle' : 'fa-circle'}`}></i>
                                    At least one number
                                </li>
                            </ul>
                        </div>

                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="btn-secondary-enhanced"
                                onClick={() => navigate('/me/profile')}
                                disabled={isLoading}
                            >
                                <i className="fas fa-times me-2"></i>
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn-primary-enhanced" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin me-2"></i>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-shield-alt me-2"></i>
                                        Update Password
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </UserLayout>
    )
}

export default UpdatePassword