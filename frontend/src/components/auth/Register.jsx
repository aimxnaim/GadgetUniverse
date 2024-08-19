import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRegisterMutation } from '../../actions/api/authApi'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false
    })

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false
    })

    const { name, email, password } = user
    const [register, { isLoading, data, error }] = useRegisterMutation()
    const navigate = useNavigate()

    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        (isAuthenticated) && navigate('/')
        error && toast.error(error?.data?.message)
        data && toast.success('Logged in successfully')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isAuthenticated])

    const validateInputs = () => {
        const newErrors = {
            name: !name || name === '',
            email: !email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
            password: !password || password.length < 6
        }
        setErrors(newErrors)
        return !Object.values(newErrors).includes(true)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        setTouched({ name: true, email: true, password: true }) // Mark all fields as touched on submit

        if (validateInputs()) {
            const signUpData = { name, email, password }
            register(signUpData)
        }
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true }) // Mark the field as touched when the user leaves the field
    }

    return (
        <>
            <MetaData title={`Register`} />
            <BreadCrumb />
            <div className="register-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="register-card shadow">
                            <form
                                className="needs-validation"
                                onSubmit={submitHandler}
                                noValidate
                            >
                                <div className='d-flex justify-content-center align-items-center gap-15 mt-2'>
                                    <img src="/images/icon/register.png" alt="" style={{ height: '75px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h3 className='mt-4 mb-0 text-center'>Register Here</h3>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name_field" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className={`form-control ${touched.name && (errors.name ? 'is-invalid' : (name ? 'is-valid' : ''))}`}
                                        name="name"
                                        value={name}
                                        onChange={onChange}
                                        onBlur={handleBlur} // Trigger validation on blur
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please provide your name.
                                    </div>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email_field" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className={`form-control ${touched.email && (errors.email ? 'is-invalid' : (email ? 'is-valid' : ''))}`}
                                        name="email"
                                        value={email}
                                        onChange={onChange}
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
                                        onChange={onChange}
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
                                    <button
                                        id="register_button"
                                        type="submit"
                                        className="button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Registering...' : 'Register'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
