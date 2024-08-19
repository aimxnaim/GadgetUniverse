import React, { useEffect, useState } from 'react'
import { useResetPasswordMutation } from '../../actions/api/userApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation();

    const navigate = useNavigate()
    const params = useParams()

    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {

        isAuthenticated && navigate('/')
        error && toast.error(error?.data?.message)
        if (isSuccess) {
            toast.success('Password reset successfully. Please login with your new password.')
            navigate('/login')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isAuthenticated, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return toast.error('Passwords do not match. Please try again.')
        }

        const data = { password, confirmPassword }
        // Dispatch forgotPassword action
        resetPassword({ body: data, token: params?.token })
    }
    return (
        <>
            <MetaData title={`Reset Password`} />
            <BreadCrumb />
            <div className="home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="register-card shadow" style={{ padding: '50px' }}>
                            <form
                                onSubmit={submitHandler}
                            >
                                <div className='d-flex justify-content-center align-items-center gap-15 mt-2'>
                                    <img src="/images/icon/reset.png" alt="" style={{ height: '75px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h3 className='mt-4 mb-0 text-center'>Reset Password</h3>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password_field" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirm_password_field" className="form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm_password_field"
                                        className="form-control"
                                        name="confirm_password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>


                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <button
                                        id="new_password_button"
                                        type="submit"
                                        className="button"
                                        disabled={isLoading}
                                    >
                                        {
                                            isLoading
                                                ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                        <span className="px-3" role="status">Loading...</span>
                                                    </>
                                                ) : ' Send Email'}
                                    </button>
                                    <Link to="/login" className="my-3" id='forgot_pass'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword