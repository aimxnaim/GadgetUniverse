import React from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import { calculateOrderCost } from '../../helpers/helpers'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {

    const { cartItem, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    const navigate = useNavigate()

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateOrderCost(cartItem)

    return (
        <>
            <MetaData title={'Confirm Order Info'} />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user?.name}</p>
                    <p><b>Phone:</b> {shippingInfo?.phoneNo}</p>
                    <p className="mb-4">
                        <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode},  {shippingInfo?.country}
                    </p>
                    <hr />
                    <h4 className="mt-3">Your Cart Items:</h4>

                    {cartItem?.map((item, index) => (
                        <>
                            <hr />
                            <div className="cart-item my-1" key={index}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img
                                            src={item?.image}
                                            alt={item?.name}
                                            height="45"
                                            width="44"
                                        />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <a href={`/products/${item?.product}`}>{item?.name}</a>
                                    </div>

                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>
                                            {item?.quantity} x RM{item?.price} = <b>RM{(item?.quantity * item?.price).toFixed(2)}</b>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </>
                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal: <span className="order-summary-values">RM {itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">RM {shippingPrice}</span></p>
                        <p>Tax (GST 6%): <span className="order-summary-values">RM {taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">RM {totalPrice}</span></p>

                        <hr />
                        <a
                            href="/payment_method"
                            id="checkout_btn"
                            className="btn btn-primary w-100"
                        >
                            Proceed to Payment
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder