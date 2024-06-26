import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import MetaData from '../layout/MetaData'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../actions/api/userApi'

const UpdateUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('user')

    const navigate = useNavigate()
    const params = useParams()

    const { data } = useGetUserDetailsQuery(params?.id)
    const [updateUser, { isLoading, error, isSuccess }] = useUpdateUserMutation()

    console.log(data)

    useEffect(() => {
        if (data?.user) {
            setName(data?.user?.name)
            setEmail(data?.user?.email)
            setRole(data?.user?.role)
        }
    }, [data])

    useEffect(() => {
        error && toast.error(error?.data?.message)

        if (isSuccess) {
            toast.success('User updated successfully')
            navigate('/admin/users')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault()

        // Create userData object
        const userData = {
            name,
            email,
            role
        }

        // Dispatch updateProfile action
        updateUser({ body: userData, userId: params?.id })
    }
    return (
        <>
            <MetaData title={'Update User'} />
            <AdminLayout>
                <div className="row wrapper">
                    <div className="col-10 col-lg-8">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h2 className="mb-4">Update User</h2>

                            <div className="mb-3">
                                <label htmlFor="name_field" className="form-label">Name</label>
                                <input
                                    type="name"
                                    id="name_field"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="role_field" className="form-label">Role</label>
                                <select
                                    id="role_field"
                                    className="form-select"
                                    name="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <button type="submit" className="btn update-btn w-100 py-2">
                                Update
                            </button>
                        </form>
                    </div>
                </div>

            </AdminLayout>
        </>
    )
}

export default UpdateUser