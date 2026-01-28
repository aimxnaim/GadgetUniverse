import React from 'react'
import SideMenu from './SideMenu'

const UserLayout = ({ children }) => {

    const menuItems = [
        {
            name: 'My Profile',
            url: '/me/profile',
            icon: 'fas fa-user',
            description: 'View your profile information'
        },
        {
            name: 'Update Profile',
            url: '/me/update_profile',
            icon: 'fas fa-user-edit',
            description: 'Edit your personal details'
        },
        {
            name: 'Upload Avatar',
            url: '/me/upload_avatar',
            icon: 'fas fa-camera',
            description: 'Change profile picture'
        },
        {
            name: 'Update Password',
            url: '/me/update_password',
            icon: 'fas fa-shield-alt',
            description: 'Manage your security'
        }
    ]
    return (
        <div className="user-settings-wrapper">
            <div className="user-settings-header">
                <div className="container">
                    <div className="header-content">
                        <div className="header-icon">
                            <i className="fas fa-cog"></i>
                        </div>
                        <div className="header-text">
                            <h2 className="header-title">Account Settings</h2>
                            <p className="header-subtitle">Manage your account preferences and security</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row g-4 mt-3">
                    <div className="col-12 col-lg-3">
                        <SideMenu menuItems={menuItems} />
                    </div>
                    <div className="col-12 col-lg-9">
                        <div className="user-content-area">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLayout