import React from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import { calculateOrderCost } from '../../helpers/helpers'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'

const ConfirmOrder = () => {

    const { cartItem, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    const navigate = useNavigate()

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateOrderCost(cartItem)

    return (
        <>
            <MetaData title={'Confirm Order Info'} />
            <CheckoutSteps shipping confirmOrder />
            
            <div className="checkout-page-container">
                <div className="checkout-header">
                    <h1 className="checkout-main-title">Confirm Your Order</h1>
                    <p className="checkout-subtitle">Review your order details before proceeding</p>
                </div>
                
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div className="modern-checkout-card">
                            <div className="card-section-header">
                                <i className="fas fa-truck"></i>
                                <h4>Shipping Information</h4>
                            </div>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">
                                        <i className="fas fa-user"></i> Name
                                    </span>
                                    <span className="info-value">{user?.name}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">
                                        <i className="fas fa-phone"></i> Phone
                                    </span>
                                    <span className="info-value">{shippingInfo?.phoneNo}</span>
                                </div>
                                <div className="info-item full-width">
                                    <span className="info-label">
                                        <i className="fas fa-map-marker-alt"></i> Address
                                    </span>
                                    <span className="info-value">
                                        {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="modern-checkout-card mt-4">
                            <div className="card-section-header">
                                <i className="fas fa-shopping-bag"></i>
                                <h4>Order Items</h4>
                            </div>
                            
                            <div className="order-items-list">
                                {cartItem?.map((item, index) => (
                                    <div className="order-item-card" key={index}>
                                        <div className="order-item-image">
                                            <img src={item?.image} alt={item?.name} />
                                        </div>
                                        <div className="order-item-details">
                                            <a href={`/products/${item?.product}`} className="order-item-name">
                                                {item?.name}
                                            </a>
                                            <div className="order-item-price-info">
                                                <span className="quantity-badge">{item?.quantity}x</span>
                                                <span className="unit-price">RM {item?.price}</span>
                                                <span className="total-price">RM {(item?.quantity * item?.price).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="modern-checkout-card sticky-summary">
                            <div className="card-section-header">
                                <i className="fas fa-receipt"></i>
                                <h4>Order Summary</h4>
                            </div>
                            
                            <div className="summary-breakdown">
                                <div className="summary-row">
                                    <span className="summary-label">Subtotal</span>
                                    <span className="summary-value">RM {itemsPrice}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="summary-label">Shipping</span>
                                    <span className="summary-value">RM {shippingPrice}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="summary-label">Tax (GST 6%)</span>
                                    <span className="summary-value">RM {taxPrice}</span>
                                </div>
                                <div className="summary-divider"></div>
                                <div className="summary-row total-row">
                                    <span className="summary-label">Total</span>
                                    <span className="summary-value">RM {totalPrice}</span>
                                </div>
                            </div>

                            <a href="/payment_method" className="modern-checkout-btn">
                                <span>Proceed to Payment</span>
                                <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder