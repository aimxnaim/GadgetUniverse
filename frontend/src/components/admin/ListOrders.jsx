import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import AdminLayout from '../layout/AdminLayout'
import { useDeleteOrderMutation, useGetAdminOrdersQuery } from '../../actions/api/orderApi'

const ListOrders = () => {

    const { data, isLoading, error } = useGetAdminOrdersQuery()
    const [deleteOrder, { error: deleteError, isSuccess, isLoading: deleteOrderLoading }] = useDeleteOrderMutation()

    useEffect(() => {

        error && toast.error(error?.data?.message)
        deleteError && toast.error(deleteError?.data?.message)
        isSuccess && toast.success('Order deleted successfully')

    }, [error, deleteError, isSuccess])

    if (isLoading) return <Loader />

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const deleteOrderHandler = (productId) => {
        deleteOrder(productId)
    }

    const setOrders = () => {
        const orders = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Payment Status',
                    field: 'paymentStatus',
                    sort: 'asc'
                },
                {
                    label: 'Order Status',
                    field: 'orderStatus',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',

                }
            ],
            rows: []
        };

        data?.order?.forEach(order => {
            orders.rows.push({
                id: order?._id,
                paymentStatus: capitalizeFirstLetter(order?.paymentInfo?.status),
                orderStatus: capitalizeFirstLetter(order?.orderStatus),
                actions: (
                    <>
                        <Link to={`/admin/orders/${order?._id}`} className='btn btn-outline-primary'>
                            <i className='fa fa-pencil'></i>
                        </Link>
                        <button
                            className='btn btn-outline-danger ms-2'
                            onClick={() => deleteOrderHandler(order?._id)}
                            disabled={deleteOrderLoading}
                        >
                            {
                                deleteOrderLoading
                                    ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span role="status"></span>
                                        </>
                                    ) : <i className='fa fa-trash'></i>}

                        </button>
                    </>
                )
            })
        })

        return orders
    }

    return (
        <>
            <MetaData title={'All Orders'} />
            <AdminLayout>
                <div>
                    <h1 className="my-5">{data?.order?.length} Orders</h1>

                    <MDBDataTable
                        data={setOrders()}
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

export default ListOrders