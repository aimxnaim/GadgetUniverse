import React, { useEffect, useState } from 'react'
import UserLayout from '../layout/UserLayout'
import { useNavigate } from 'react-router-dom'
import { useUploadAvatarMutation } from '../../actions/api/userApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { getAvatarUrl } from '../../constants/constants'

const UploadAvatar = () => {

    const { user } = useSelector(state => state.auth)
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState(
        getAvatarUrl(user?.avatar?.url)
    )
    const [isDragging, setIsDragging] = useState(false)

    const navigate = useNavigate()
    const [uploadAvatar, { isLoading, error, isSuccess }] = useUploadAvatarMutation()

    useEffect(() => {

        error && toast.error(error?.data?.message)

        if (isSuccess) {
            toast.success('Avatar uploaded successfully')
            navigate('/me/profile')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault()

        if (!avatar) {
            toast.error('Please select an avatar image')
            return
        }

        // Create userData object
        const userData = {
            avatar
        }

        // Dispatch updateProfile action
        uploadAvatar(userData)
    }

    const handleFileRead = (file) => {
        if (!file) return
        
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file')
            return
        }

        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result)
                setAvatarPreview(reader.result)
            }
        }

        reader.readAsDataURL(file)
    }

    const onChange = (e) => {
        const file = e.target.files[0]
        handleFileRead(file)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        
        const file = e.dataTransfer.files[0]
        handleFileRead(file)
    }

    return (
        <UserLayout>
            <div className="profile-form-container">
                <div className="profile-form-card">
                    <div className="form-header">
                        <div className="form-icon">
                            <i className="fas fa-camera"></i>
                        </div>
                        <h2 className="form-title">Upload Avatar</h2>
                        <p className="form-subtitle">Choose a profile picture that represents you</p>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className="avatar-upload-section">
                            {/* Avatar Preview */}
                            <div className="avatar-preview-container">
                                <div className="avatar-preview-wrapper">
                                    <img 
                                        src={avatarPreview} 
                                        className="avatar-preview-img" 
                                        alt="Avatar Preview" 
                                    />
                                    <div className="avatar-overlay">
                                        <i className="fas fa-camera"></i>
                                    </div>
                                </div>
                                <p className="avatar-preview-text">
                                    <i className="fas fa-info-circle me-2"></i>
                                    Preview
                                </p>
                            </div>

                            {/* Upload Area */}
                            <div 
                                className={`avatar-dropzone ${isDragging ? 'dragging' : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    name="avatar"
                                    className="avatar-file-input"
                                    id="avatar-input"
                                    accept="image/*"
                                    onChange={onChange}
                                />
                                <label htmlFor="avatar-input" className="avatar-upload-label">
                                    <div className="upload-icon">
                                        <i className="fas fa-cloud-upload-alt"></i>
                                    </div>
                                    <p className="upload-text">
                                        <strong>Click to upload</strong> or drag and drop
                                    </p>
                                    <p className="upload-hint">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </label>
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
                                disabled={isLoading || !avatar}
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin me-2"></i>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-upload me-2"></i>
                                        Upload Avatar
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

export default UploadAvatar