import React, { useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useOrderDetailsQuery } from '../../actions/api/orderApi'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'

const OrderDetails = () => {
    const params = useParams()
    const { data, isLoading, error } = useOrderDetailsQuery(params?.id)
    const order = data?.order || {}

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

        error && toast.error(error?.data?.message)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    if (isLoading) return <Loader />

    return (
        <>
            <MetaData title={'Order Details'} />
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-9 mt-5 order-details">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mt-5 mb-4">Your Order Details</h3>
                        <a className="btn btn-success" href={`/invoice/order/${order?._id}`}>
                            <i className="fa fa-print"></i> Invoice
                        </a>
                    </div>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">ID</th>
                                <td>{order?._id}</td>
                            </tr>
                            <tr>
                                <th scope="row">Status</th>
                                <td className={
                                    String(orderStatus).includes('Delivered')
                                        ? "greenColor"
                                        : "redColor"
                                }>
                                    <b>{orderStatus}</b>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Date</th>
                                <td>{new Date(order?.createdAt).toLocaleString("en-US")}</td>
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
                                <td className={isPaid ? "greenColor" : "redColor"}>
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
                                <th scope="row">Amount Paid</th>
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
                                    {/*  eslint-disable-next-line no-unsafe-optional-chaining */}
                                    <p>RM {(item?.price).toFixed(2)}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{item?.quantity} Piece(s)</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                </div>
            </div>
        </>
    )
}

export default OrderDetails