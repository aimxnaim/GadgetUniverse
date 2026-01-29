import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateProfileMutation } from '../../actions/api/userApi'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import UserLayout from '../layout/UserLayout'

const UpdateProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const [updateProfile, { isLoading, error, isSuccess }] =
        useUpdateProfileMutation()

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) {
            setName(user?.name)
            setEmail(user?.email)
        }

        error && toast.error(error?.data?.message)

        if (isSuccess) {
            toast.success('Profile updated successfully')
            navigate('/me/profile')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, error, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault()

        // Create userData object
        const userData = {
            name,
            email
        }

        // Dispatch updateProfile action
        updateProfile(userData)
    }

    return (
        <UserLayout>
            <div className="profile-form-container">
                <div className="profile-form-card">
                    <div className="form-header">
                        <div className="form-icon">
                            <i className="fas fa-user-edit"></i>
                        </div>
                        <h2 className="form-title">Update Profile</h2>
                        <p className="form-subtitle">Keep your profile information up to date</p>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className="form-group-enhanced">
                            <label htmlFor="name_field" className="form-label-enhanced">
                                <i className="fas fa-user me-2"></i>
                                Full Name
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control-enhanced"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group-enhanced">
                            <label htmlFor="email_field" className="form-label-enhanced">
                                <i className="fas fa-envelope me-2"></i>
                                Email Address
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control-enhanced"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>
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
                                        <i className="fas fa-save me-2"></i>
                                        Save Changes
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

export default UpdateProfile