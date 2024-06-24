import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import { calculateOrderCost } from '../../helpers/helpers'
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from '../../actions/api/orderApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const PaymentMethod = () => {
    const [method, setMethod] = useState('')
    const navigate = useNavigate()

    const { shippingInfo, cartItem } = useSelector(state => state.cart)
    const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation()
    const [stripeCheckoutSession, { data: checkoutData, error: checkoutError, isLoading }] = useStripeCheckoutSessionMutation()

    useEffect(() => {
        if (checkoutData) {
            window.location.href = checkoutData?.url
        }
        if (checkoutError) {
            toast.error(checkoutError?.data?.message)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkoutData, checkoutError])

    useEffect(() => {
        error && toast.error(error?.data?.message)
        if (isSuccess) {
            toast.success('Order created successfully')
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, error])

    const submitHandler = (e) => {
        e.preventDefault()

        const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateOrderCost(cartItem)

        if (method == 'COD') {
            // Create COD order     
            const orderData = {
                shippingInfo,
                orderItems: cartItem,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
                paymentInfo: {
                    status: 'Not Paid',
                },
                paymentMethod: 'COD',
            }

            createNewOrder(orderData)
        }
        if (method == 'Card') {
            // Create Card order     
            const orderData = {
                shippingInfo,
                orderItems: cartItem,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            }

            stripeCheckoutSession(orderData)
        }
    }
    return (
        <>
            <MetaData title={'Confirm Order Info'} />
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">Select Payment Method</h2>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="codradio"
                                value="COD"
                                onChange={() => setMethod('COD')}
                            />
                            <label className="form-check-label" htmlFor="codradio">
                                Cash on Delivery
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="cardradio"
                                value="Card"
                                onChange={() => setMethod('Card')}
                            />
                            <label className="form-check-label" htmlFor="cardradio">
                                Card - VISA, MasterCard
                            </label>
                        </div>

                        <button id="shipping_btn" type="submit" className="btn py-2 w-100" disabled={isLoading}>
                            {
                                isLoading
                                    ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                        </>
                                    ) : ' CONTINUE'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PaymentMethod