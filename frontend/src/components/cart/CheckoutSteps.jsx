import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    // Determine which steps are clickable (completed steps)
    const isShippingClickable = confirmOrder || payment
    const isConfirmOrderClickable = payment

    return (
        <div className="modern-checkout-steps">
            <div className="checkout-steps-container">
                {/* Step 1: Shipping */}
                {isShippingClickable ? (
                    <Link 
                        to="/shipping" 
                        className={`checkout-step ${shipping ? 'active' : ''} ${confirmOrder || payment ? 'completed' : ''} clickable`}
                    >
                        <div className="step-icon">
                            <i className={`fas ${confirmOrder || payment ? 'fa-check' : 'fa-truck'}`}></i>
                        </div>
                        <div className="step-content">
                            <div className="step-label">Step 1</div>
                            <div className="step-title">Shipping</div>
                        </div>
                    </Link>
                ) : (
                    <div className={`checkout-step ${shipping ? 'active' : ''}`}>
                        <div className="step-icon">
                            <i className="fas fa-truck"></i>
                        </div>
                        <div className="step-content">
                            <div className="step-label">Step 1</div>
                            <div className="step-title">Shipping</div>
                        </div>
                    </div>
                )}
                
                <div className={`step-connector ${confirmOrder || payment ? 'completed' : ''}`}></div>
                
                {/* Step 2: Confirm Order */}
                {isConfirmOrderClickable ? (
                    <Link 
                        to="/confirm_order" 
                        className={`checkout-step ${confirmOrder ? 'active' : ''} ${payment ? 'completed' : ''} clickable`}
                    >
                        <div className="step-icon">
                            <i className={`fas ${payment ? 'fa-check' : 'fa-clipboard-check'}`}></i>
                        </div>
                        <div className="step-content">
                            <div className="step-label">Step 2</div>
                            <div className="step-title">Confirm Order</div>
                        </div>
                    </Link>
                ) : (
                    <div className={`checkout-step ${confirmOrder ? 'active' : ''}`}>
                        <div className="step-icon">
                            <i className="fas fa-clipboard-check"></i>
                        </div>
                        <div className="step-content">
                            <div className="step-label">Step 2</div>
                            <div className="step-title">Confirm Order</div>
                        </div>
                    </div>
                )}
                
                <div className={`step-connector ${payment ? 'completed' : ''}`}></div>
                
                {/* Step 3: Payment */}
                <div className={`checkout-step ${payment ? 'active' : ''}`}>
                    <div className="step-icon">
                        <i className="fas fa-credit-card"></i>
                    </div>
                    <div className="step-content">
                        <div className="step-label">Step 3</div>
                        <div className="step-title">Payment</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSteps