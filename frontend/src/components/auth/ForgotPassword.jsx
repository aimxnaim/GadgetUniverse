import React, { useEffect, useState } from 'react'
import { useForgotPasswordMutation } from '../../actions/api/userApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'

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
        <>
            <MetaData title={`Forgot Password`} />
            <BreadCrumb />
            <div className="register-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="register-card shadow">
                            <form
                                onSubmit={submitHandler}
                            >
                                <div className='d-flex justify-content-center align-items-center gap-15 mt-2'>
                                    <img src="/images/icon/forgot-password.png" alt="" style={{ height: '75px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h3 className='mt-4 mb-0 text-center'>Forgot Password</h3>
                                </div>
                                <div className="mb-0">
                                    <label htmlFor="email_field" className="form-label">Enter Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <span className='fst-italic' id='forgot_pass_span'>Note* : The email will be sent to the Mailtrap Box</span>

                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <button
                                        id="forgot_password_button"
                                        type="submit"
                                        className="button mt-3"
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
                                    </button>                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ForgotPassword