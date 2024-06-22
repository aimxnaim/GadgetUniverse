import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../redux/api/authApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
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

    console.log(data)

    const submitHandler = (e) => {
        e.preventDefault()

        // Create loginData object
        const signUpData = {
            name,
            email,
            password
        }

        // Dispatch register action
        register(signUpData)
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form
                    className="shadow rounded bg-body"
                    onSubmit={submitHandler}
                >
                    <h2 className="mb-4">Register</h2>

                    <div className="mb-3">
                        <label htmlFor="name_field" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email_field" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password_field" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className="btn w-100 py-2"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register