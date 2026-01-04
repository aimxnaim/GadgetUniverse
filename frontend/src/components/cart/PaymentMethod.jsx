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
            navigate('/me/orders?order_success=true')
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
            
            <div className="checkout-page-container">
                <div className="checkout-header">
                    <h1 className="checkout-main-title">Payment Method</h1>
                    <p className="checkout-subtitle">Choose how you'd like to pay</p>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="modern-checkout-card">
                            <form onSubmit={submitHandler}>
                                <div className="payment-methods-grid">
                                    <label className={`payment-method-card ${method === 'COD' ? 'selected' : ''}`}>
                                        <input
                                            className="payment-radio"
                                            type="radio"
                                            name="payment_mode"
                                            id="codradio"
                                            value="COD"
                                            onChange={() => setMethod('COD')}
                                        />
                                        <div className="payment-content">
                                            <div className="payment-icon cod-icon">
                                                <i className="fas fa-money-bill-wave"></i>
                                            </div>
                                            <div className="payment-details">
                                                <h5>Cash on Delivery</h5>
                                                <p>Pay when you receive your order</p>
                                            </div>
                                            <div className="payment-check">
                                                <i className="fas fa-check-circle"></i>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`payment-method-card ${method === 'Card' ? 'selected' : ''}`}>
                                        <input
                                            className="payment-radio"
                                            type="radio"
                                            name="payment_mode"
                                            id="cardradio"
                                            value="Card"
                                            onChange={() => setMethod('Card')}
                                        />
                                        <div className="payment-content">
                                            <div className="payment-icon card-icon">
                                                <i className="fas fa-credit-card"></i>
                                            </div>
                                            <div className="payment-details">
                                                <h5>Credit/Debit Card</h5>
                                                <p>VISA, MasterCard, and more</p>
                                            </div>
                                            <div className="payment-check">
                                                <i className="fas fa-check-circle"></i>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <button 
                                    type="submit" 
                                    className="modern-checkout-btn mt-4" 
                                    disabled={isLoading || !method}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Complete Order</span>
                                            <i className="fas fa-lock"></i>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentMethod