import React, { useEffect, useState } from 'react'
import { useForgotPasswordMutation } from '../../actions/api/userApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation()

    const navigate = useNavigate()

    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        (isAuthenticated) && navigate('/')

        error && toast.error(error?.data?.message)
        isSuccess && toast.success('Email Sent. Please check your email inbox.')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isAuthenticated, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault()

        // Dispatch forgotPassword action
        forgotPassword({ email })
    }


    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form
                    className="shadow rounded bg-body"
                    onSubmit={submitHandler}
                >
                    <h2 className="mb-4">Forgot Password</h2>
                    <div className="mt-3">
                        <label htmlFor="email_field" className="form-label">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
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
        </div >
    )
}

export default ForgotPassword