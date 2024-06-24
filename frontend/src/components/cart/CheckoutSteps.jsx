import React from 'react'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">

            {shipping ? (

                // ? Shipping (Active) 
                <a
                    href="/shipping"
                    className="float-right"
                >
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Shipping</div>
                    <div className="triangle-active"></div>
                </a>

            ) : (

                // ? Shipping (Inactive)
                <a
                    href="#!"
                    className="float-right"
                    disabled
                >
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Shipping</div>
                    <div className="triangle-incomplete"></div>
                </a>

            )}
            {confirmOrder ? (

                // ? Confirm Order (Active)
                <a
                    href="/confirm_order"
                    className="float-right"
                >
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Confirm Order</div>
                    <div className="triangle-active"></div>
                </a>

            ) : (

                //  ? Confirm Order (Inactive)
                <a
                    href="#!"
                    className="float-right"
                    disabled
                >
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Confirm Order</div>
                    <div className="triangle-incomplete"></div>
                </a>
            )}

            {payment ? (

                // ? Payment (Active)
                <a
                    href="/payment_method"
                    className="float-right"
                >
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Payment</div>
                    <div className="triangle-active"></div>
                </a>

            ) : (

                // ? Payment (Inactive)
                <a
                    href="#!"
                    className="float-right"
                    disabled
                >
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Payment</div>
                    <div className="triangle-incomplete"></div>
                </a>

            )}






        </div>
    )
}

export default CheckoutSteps