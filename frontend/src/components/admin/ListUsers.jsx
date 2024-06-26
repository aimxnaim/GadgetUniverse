import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import AdminLayout from '../layout/AdminLayout'
import { useGetAdminUsersQuery } from '../../actions/api/userApi'

const ListUsers = () => {

    const { data, isLoading, error } = useGetAdminUsersQuery()

    useEffect(() => {

        error && toast.error(error?.data?.message)
        // deleteError && toast.error(deleteError?.data?.message)
        // isSuccess && toast.success('Order deleted successfully')

    }, [error])

    if (isLoading) return <Loader />

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // const deleteUserHandler = (userId) => {
    //     deleteUser(userId)
    // }

    const setUsers = () => {
        const users = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',

                }
            ],
            rows: []
        };

        data?.user?.forEach(user => {
            users.rows.push({
                id: user?._id,
                name: user?.name,
                email: user?.email,
                role: capitalizeFirstLetter(user?.role),
                actions: (
                    <>
                        <Link to={`/admin/users/${user?._id}`} className='btn btn-outline-primary'>
                            <i className='fa fa-pencil'></i>
                        </Link>
                        <button
                            className='btn btn-outline-danger ms-2'
                        // onClick={() => deleteUserHandler(user?._id)}
                        // disabled={deleteUserLoading}
                        >
                            <i className='fa fa-trash'></i>
                            {/* {
                                deleteUserLoading
                                    ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span role="status"></span>
                                        </>
                                    ) : <i className='fa fa-trash'></i>} */}

                        </button>
                    </>
                )
            })
        })

        return users
    }

    return (
        <>
            <MetaData title={'All Users'} />
            <AdminLayout>
                <div>
                    <h1 className="my-5">{data?.user?.length} Users</h1>

                    <MDBDataTable
                        data={setUsers()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />
                </div>
            </AdminLayout>
        </>
    )
}

export default ListUsers