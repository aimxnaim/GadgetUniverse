import React from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCartItem, removeCartItem } from '../../actions/features/cartSlice'
import toast from 'react-hot-toast'

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItem = [] } = useSelector(state => state.cart)

    const totalUnits = cartItem?.reduce((acc, item) => acc + item?.quantity, 0) || 0
    const totalAmount = cartItem?.reduce((acc, item) => acc + item?.quantity * item?.price, 0) || 0

    const increaseQty = (item, quantity) => {
        const itemQty = quantity + 1

        if (itemQty > item?.stock) return
        setItemToCart(item, itemQty)
    }

    const decreaseQty = (item, quantity) => {
        const itemQty = quantity - 1

        if (itemQty <= 0) return
        setItemToCart(item, itemQty)
    }

    const setItemToCart = (item, newQuantity) => {
        const cartItemPayload = {
            product: item?.product,
            name: item?.name,
            price: item?.price,
            image: item?.image,
            stock: item?.stock,
            quantity: newQuantity
        }

        dispatch(setCartItem(cartItemPayload))
    }

    const removeCartItemHandler = (id) => {
        dispatch(removeCartItem(id))
        toast.error('Item removed from cart')
    }

    const checkoutHandler = () => {
        toast.success('Fill in your shipping details to proceed')
        navigate('/shipping')
    }

    return (
        <>
            <MetaData title={'Your Cart'} />
            <section className="cart-page">
                <div className="container-xxl">
                    <div className="row g-4 align-items-center cart-top">
                        <div className="col-lg-7">
                            <div className="cart-welcome card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <p className="cart-eyebrow text-uppercase">Your bag</p>
                                    <h1 className="cart-title">Ready when you are</h1>
                                    <p className="cart-subtitle">
                                        Keep tweaking quantities or head straight to checkout. We keep things light so your scroll stays smooth.
                                    </p>
                                    <div className="d-flex flex-wrap gap-2">
                                        <Link className="btn btn-dark rounded-pill" to="/store">
                                            Browse gadgets
                                        </Link>
                                        {cartItem?.length > 0 && (
                                            <button className="btn btn-outline-dark rounded-pill" type="button" onClick={checkoutHandler}>
                                                Checkout now
                                            </button>
                                        )}
                                    </div>
                                    <div className="cart-stats mt-4">
                                        <div>
                                            <small className="text-muted">Items</small>
                                            <p className="display-6 mb-0">{totalUnits}</p>
                                        </div>
                                        <div>
                                            <small className="text-muted">Total</small>
                                            <p className="display-6 mb-0">RM {totalAmount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="cart-illustration shadow-sm" aria-hidden="true">
                                <div className="cart-illustration-face">
                                    <span className="eye left" />
                                    <span className="eye right" />
                                    <span className="smile" />
                                </div>
                                <div className="cart-illustration-body">
                                    <span className="bag" />
                                    <span className="sparkle one" />
                                    <span className="sparkle two" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {cartItem?.length === 0 ? (
                        <div className="cart-empty card border-0 shadow-sm mt-4 text-center">
                            <div className="card-body py-5">
                                <p className="cart-eyebrow text-uppercase">Cart is empty</p>
                                <h3 className="mb-3">Add something beautiful</h3>
                                <p className="text-muted mb-4">
                                    Items are saved instantly. Drop your favourite gadgets in and we’ll remember them for you.
                                </p>
                                <div className="d-flex flex-wrap gap-2 justify-content-center">
                                    <Link className="btn btn-dark rounded-pill" to="/">
                                        Find new arrivals
                                    </Link>
                                    <Link className="btn btn-outline-dark rounded-pill" to="/wishlist">
                                        Go to wishlist
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="row g-4 mt-1">
                            <div className="col-12 col-lg-8">
                                <div className="cart-items-stack">
                                    {cartItem?.map(item => (
                                        <div className="cart-item-card card border-0 shadow-sm" key={item?.product}>
                                            <div className="card-body">
                                                <div className="cart-item-header">
                                                    <div className="cart-item-thumb">
                                                        <img src={item?.image} alt={item?.name} />
                                                    </div>
                                                    <div className="cart-item-meta">
                                                        <Link to={`/store/${item?.product}`} className="cart-item-name">
                                                            {item?.name}
                                                        </Link>
                                                        <p className="cart-item-price">RM {item?.price}</p>
                                                        <p className="cart-item-stock text-muted">{item?.stock} in stock</p>
                                                    </div>
                                                    <button
                                                        className="btn btn-link text-muted p-0 cart-remove"
                                                        type="button"
                                                        onClick={() => removeCartItemHandler(item?.product)}
                                                        aria-label={`Remove ${item?.name} from cart`}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="cart-item-footer">
                                                    <div className="cart-quantity">
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            type="button"
                                                            onClick={() => decreaseQty(item, item.quantity)}
                                                        >
                                                            −
                                                        </button>
                                                        <input type="number" className="qty-input" value={item?.quantity} readOnly />
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            type="button"
                                                            onClick={() => increaseQty(item, item.quantity)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="cart-item-total text-end">
                                                        <span className="text-muted small">Subtotal</span>
                                                        <strong>RM {(item?.price * item?.quantity).toFixed(2)}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div className="cart-summary card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h4 className="mb-3">Order summary</h4>
                                        <div className="summary-line">
                                            <span>Items</span>
                                            <span>{totalUnits}</span>
                                        </div>
                                        <div className="summary-line">
                                            <span>Shipping</span>
                                            <span className="text-muted">Calculated at next step</span>
                                        </div>
                                        <div className="summary-line total fw-bold">
                                            <span>Total</span>
                                            <span>RM {totalAmount.toFixed(2)}</span>
                                        </div>
                                        <button id="checkout_btn" className="btn btn-dark w-100 mt-3" type="button" onClick={checkoutHandler}>
                                            Proceed to checkout
                                        </button>
                                        <p className="text-muted small mt-3 mb-0">We save your cart with every change.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Cart
