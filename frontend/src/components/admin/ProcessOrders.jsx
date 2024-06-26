import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import AdminLayout from '../layout/AdminLayout'
import { useOrderDetailsQuery, useUpdateOrderMutation } from '../../actions/api/orderApi'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const ProcessOrders = () => {

    const [status, setStatus] = useState('')
    const params = useParams()
    const { data, isLoading } = useOrderDetailsQuery(params?.id)
    const order = data?.order || {}

    const [updateOrder, { isSuccess, error }] = useUpdateOrderMutation()

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        user,
        totalPrice,
        orderStatus
    } = order

    const isPaid = paymentInfo?.status === 'paid' ? true : false

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        if (orderStatus) {
            setStatus(orderStatus)
        }
    }, [orderStatus])

    useEffect(() => {
        error && toast.error(error?.data?.message)
        isSuccess && toast.success('Order updated')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isSuccess])

    const updateOrderHandler = (id) => {
        const data = { status }

        updateOrder({ id, body: data })
    }

    if (isLoading) return <Loader />

    return (
        <>
            <MetaData title={'Process Order'} />
            <AdminLayout>
                <div className="row d-flex justify-content-around">
                    <div className="col-12 col-lg-8 order-details">
                        <h3 className="mt-5 mb-4">Order Details</h3>

                        <table className="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">Order ID</th>
                                    <td>{order?._id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Order Status</th>
                                    <td className={
                                        orderStatus.includes('Delivered')
                                            ? "greenColor"
                                            : "redColor"
                                    }>
                                        <b>{capitalizeFirstLetter(orderStatus)}</b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="mt-5 mb-4">Shipping Info</h3>
                        <table className="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{user?.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Phone No</th>
                                    <td>{shippingInfo?.phoneNo}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Address</th>
                                    <td>{shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode},  {shippingInfo?.country}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="mt-5 mb-4">Payment Info</h3>
                        <table className="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">Status</th>
                                    <td className={
                                        paymentInfo?.status.includes('paid')
                                            ? "greenColor"
                                            : "redColor"
                                    }>
                                        <b>{capitalizeFirstLetter(paymentInfo?.status)}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Method</th>
                                    <td>{order?.paymentMethod}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Stripe ID</th>
                                    <td>{paymentInfo?.id || '-'}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Amount</th>
                                    <td>RM {totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="mt-5 my-4">Order Items:</h3>

                        <hr />
                        <div className="cart-item my-1">
                            {orderItems?.map((item, index) => (
                                <div className="row my-5" key={index}>
                                    <div className="col-4 col-lg-2">
                                        <img
                                            src={item?.image}
                                            alt={item?.name}
                                            height="45"
                                            width="45"
                                        />
                                    </div>
                                    <div className="col-5 col-lg-5">
                                        <a href={`/products/${item?.product}`}>{item?.name}</a>
                                    </div>
                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>RM{item?.price.toFixed(2)}</p>
                                    </div>
                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{item?.quantity} Piece(s)</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <hr />
                    </div>

                    <div className="col-12 col-lg-3 mt-5">
                        <h4 className="my-4">Status</h4>

                        <div className="mb-3">
                            <select
                                className="form-select"
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>

                        <button
                            className="btn btn-primary w-100"
                            onClick={() => updateOrderHandler(order?._id)}
                        >Update Status</button>

                        <h4 className="mt-5 mb-3">Order Invoice</h4>
                        <a href={`/invoice/order/${order?._id}`} className="btn btn-success w-100">
                            <i className="fa fa-print"></i> Generate Invoice
                        </a>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}

export default ProcessOrders