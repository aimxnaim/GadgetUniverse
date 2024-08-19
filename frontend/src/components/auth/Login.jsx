import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../actions/api/authApi'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({
        email: false,
        password: false
    })

    // Track if the fields have been touched
    const [touched, setTouched] = useState({
        email: false,
        password: false
    })

    const navigate = useNavigate()
    const [login, { data, isLoading, error }] = useLoginMutation()
    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) navigate('/')
        if (error) toast.error(error?.data?.message)
        if (data) toast.success('Logged in successfully')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isAuthenticated])

    const validateInputs = () => {
        const newErrors = {
            email: !email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
            password: !password || password.length < 6
        }
        setErrors(newErrors)
        return !Object.values(newErrors).includes(true)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        // Mark all fields as touched on submit
        setTouched({ email: true, password: true })

        if (validateInputs()) {
            const loginData = { email, password }
            login(loginData)
        }
    }

    // Handle onBlur to mark field as touched
    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true })
    }

    return (
        <>
            <MetaData title={`Log In`} />
            <BreadCrumb />
            <div className="login-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="login-card shadow">

                            <div className='d-flex justify-content-center align-items-center gap-15 mt-2'>
                                <img src="/images/icon/icons8-login-64.png" alt="" />
                            </div>
                            <form
                                className="needs-validation"
                                onSubmit={submitHandler}
                                noValidate
                            >
                                <div className="mt-0 mb-3">
                                    <label htmlFor="email_field" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className={`form-control ${touched.email && (errors.email ? 'is-invalid' : (email ? 'is-valid' : ''))}`}
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={handleBlur} // Trigger validation on blur
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please provide a valid email.
                                    </div>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password_field" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className={`form-control ${touched.password && (errors.password ? 'is-invalid' : (password ? 'is-valid' : ''))}`}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={handleBlur} // Trigger validation on blur
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Password must be at least 6 characters.
                                    </div>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Link to="/login/forgot password" className="mb-4" id='forgot_pass'>Forgot Password?</Link>
                                </div>
                                <div className="d-flex justify-content-center align-items-center gap-15">
                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="button"
                                        disabled={isLoading}
                                    >
                                        {
                                            isLoading
                                                ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                        <span className="px-3" role="status">Logging In...</span>
                                                    </>
                                                ) : 'Login'
                                        }
                                    </button>

                                    <Link to="/login/register" id='register_button' className="button">New User?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
