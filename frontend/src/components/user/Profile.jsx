import React from 'react'
import UserLayout from '../layout/UserLayout'
import { useSelector } from 'react-redux'
import { getAvatarUrl } from '../../constants/constants'
import { Link } from 'react-router-dom'

const Profile = () => {
    const { user } = useSelector(state => state.auth)
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    
    return (
        <UserLayout>
            <div className="profile-container">
                {/* Profile Header Card */}
                <div className="profile-header-card">
                    <div className="profile-avatar-section">
                        <div className="avatar-wrapper">
                            <img
                                className="profile-avatar-img"
                                src={getAvatarUrl(user?.avatar?.url)}
                                alt={user?.name}
                            />
                            <div className="avatar-badge">
                                <i className="fas fa-check-circle"></i>
                            </div>
                        </div>
                        <h3 className="profile-name">{user?.name}</h3>
                        <p className="profile-role">
                            <i className="fas fa-user-shield me-2"></i>
                            {user?.role === 'admin' ? 'Administrator' : 'Member'}
                        </p>
                    </div>
                </div>

                {/* Profile Info Cards */}
                <div className="row g-4 mt-2">
                    <div className="col-md-6">
                        <div className="profile-info-card">
                            <div className="info-icon">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="info-content">
                                <label className="info-label">Full Name</label>
                                <p className="info-value">{user?.name}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="profile-info-card">
                            <div className="info-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="info-content">
                                <label className="info-label">Email Address</label>
                                <p className="info-value">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="profile-info-card">
                            <div className="info-icon">
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                            <div className="info-content">
                                <label className="info-label">Member Since</label>
                                <p className="info-value">{formatDate(user?.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="profile-info-card">
                            <div className="info-icon">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <div className="info-content">
                                <label className="info-label">Account Status</label>
                                <p className="info-value">
                                    <span className="status-badge active">
                                        <i className="fas fa-circle me-1"></i>
                                        Active
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="profile-actions mt-4">
                    <h5 className="actions-title">
                        <i className="fas fa-bolt me-2"></i>
                        Quick Actions
                    </h5>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <Link to="/me/update_profile" className="action-card">
                                <i className="fas fa-edit"></i>
                                <span>Edit Profile</span>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/me/upload_avatar" className="action-card">
                                <i className="fas fa-camera"></i>
                                <span>Change Avatar</span>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/me/update_password" className="action-card">
                                <i className="fas fa-lock"></i>
                                <span>Update Password</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default Profile