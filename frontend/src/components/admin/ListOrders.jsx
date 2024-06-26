import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import AdminLayout from '../layout/AdminLayout'
import { useGetAdminOrdersQuery } from '../../actions/api/orderApi'

const ListOrders = () => {

    const { data, isLoading, error } = useGetAdminOrdersQuery()

    useEffect(() => {

        error && toast.error(error?.data?.message)
        // deleteProductError && toast.error(deleteProductError?.data?.message)
        // isSuccess && toast.success('Product deleted successfully')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    if (isLoading) return <Loader />

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // const deleteProductHandler = (productId) => {
    //     deleteProduct(productId)
    // }

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
                        // onClick={() => deleteProductHandler(order?._id)}
                        // disabled={deleteProductLoading}
                        >
                            <i className='fa fa-trash'></i>
                            {/* {
                                deleteProductLoading
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