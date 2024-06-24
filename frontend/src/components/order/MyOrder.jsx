import React, { useEffect } from 'react'
import { useMyOrdersQuery } from '../../actions/api/orderApi'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'

const MyOrder = () => {

    const { data, isLoading, error } = useMyOrdersQuery()

    console.log(data)
    const navigate = useNavigate()


    useEffect(() => {

        error && toast.error(error?.data?.message)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    if (isLoading) return <Loader />

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                    label: 'No of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount (RM)',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Payment Status',
                    field: 'status',
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
                numOfItems: order?.orderItems?.length,
                amount: `${order?.totalPrice}`,
                status: String(order?.paymentInfo?.status).includes('paid') ? <p style={{ color: 'green' }}>{capitalizeFirstLetter(order?.paymentInfo?.status)}</p> : <p style={{ color: 'red' }}>{capitalizeFirstLetter(order?.paymentInfo?.status)}</p>,
                orderStatus: String(order?.orderStatus).includes('Delivered') ? <p style={{ color: 'green' }}>{order?.orderStatus}</p> : <p style={{ color: 'red' }}>{order?.orderStatus}</p>,
                actions: (
                    <>
                        <Link to={`/me/order/${order?._id}`} className='btn btn-primary'>
                            <i className='fa fa-eye'></i>
                        </Link>
                        <Link to={`/invoice/order/${order?._id}`} className='btn btn-success ms-2'>
                            <i className='fa fa-print'></i>
                        </Link>
                    </>
                )
            })
        })

        return orders
    }

    return (
        <>
            <MetaData title={'My Orders'} />
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
        </>
    )
}

export default MyOrder