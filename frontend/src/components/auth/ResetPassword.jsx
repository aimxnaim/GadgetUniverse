import React, { useEffect, useState } from 'react'
import { useResetPasswordMutation } from '../../actions/api/userApi'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

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
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form
                    className="shadow rounded bg-body"
                    onSubmit={submitHandler}
                >
                    <h2 className="mb-4">New Password</h2>

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

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn w-100 py-2"
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
                </form>
            </div>
        </div>
    )
}

export default ResetPassword