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
                <div className="cart-glow orb-one" />
                <div className="cart-glow orb-two" />
                <div className="cart-glow orb-three" />

                <div className="container-xxl">
                    <div className="cart-hero glass-panel">
                        <div className="cart-hero-copy">
                            <p className="cart-eyebrow">Beauty add-to-cart</p>
                            <h1 className="cart-title">Make your cart look as good as your gadgets.</h1>
                            <p className="cart-subtitle">
                                Flowing gradients, playful 3D accents, and silky controls make adding to cart
                                feel delightful. Adjust quantities in real time and glide to checkout.
                            </p>
                            <div className="cart-hero-actions">
                                <Link className="btn-cart-cta" to="/products">
                                    Browse gadgets
                                </Link>
                                {cartItem?.length > 0 && (
                                    <button className="btn-cart-ghost" type="button" onClick={checkoutHandler}>
                                        Jump to checkout
                                    </button>
                                )}
                            </div>
                            <div className="cart-badges">
                                <span className="pill">Live quantity magic</span>
                                <span className="pill">Soft neon glow</span>
                                <span className="pill">Comfort animations</span>
                            </div>
                        </div>
                        <div className="cart-hero-visual">
                            <div className="cart-orbital" aria-hidden="true">
                                <div className="cart-orbital-center" />
                                <div className="cart-orbital-ring" />
                                <div className="cart-floating-ticket">
                                    <p className="ticket-title">Your cart</p>
                                    <p className="ticket-highlight">{totalUnits} items</p>
                                    <p className="ticket-sub">RM {totalAmount.toFixed(2)}</p>
                                </div>
                                <div className="cart-floating-bag">
                                    <div className="bag-handle" />
                                    <div className="bag-body" />
                                    <div className="bag-shine" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {cartItem?.length === 0 ? (
                        <div className="cart-empty-state glass-panel">
                            <div className="cart-empty-visual" aria-hidden="true">
                                <div className="empty-orb" />
                                <div className="empty-box">
                                    <span className="empty-lid" />
                                    <span className="empty-heart">❤</span>
                                </div>
                            </div>
                            <div className="cart-empty-copy">
                                <h3>Your cart is feeling lonely</h3>
                                <p>
                                    Add something shiny! Explore gadgets, drop them here, and watch this space
                                    light up with playful 3D vibes.
                                </p>
                                <div className="cart-hero-actions">
                                    <Link className="btn-cart-cta" to="/products">Find new arrivals</Link>
                                    <Link className="btn-cart-ghost" to="/wishlist">Go to wishlist</Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="row g-4 cart-content">
                            <div className="col-12 col-lg-8">
                                <div className="cart-items-stack">
                                    {cartItem?.map(item => (
                                        <div className="cart-item-card" key={item?.product}>
                                            <div className="cart-item-header">
                                                <div className="cart-item-thumb">
                                                    <img src={item?.image} alt={item?.name} />
                                                    <span className="item-qty-pill">{item?.quantity} pcs</span>
                                                </div>
                                                <div className="cart-item-meta">
                                                    <Link to={`/products/${item?.product}`} className="cart-item-name">
                                                        {item?.name}
                                                    </Link>
                                                    <p className="cart-item-price">RM {item?.price}</p>
                                                    <p className="cart-item-stock">{item?.stock} in stock</p>
                                                </div>
                                                <button
                                                    className="cart-remove"
                                                    type="button"
                                                    onClick={() => removeCartItemHandler(item?.product)}
                                                    aria-label={`Remove ${item?.name} from cart`}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <div className="cart-item-footer">
                                                <div className="cart-quantity">
                                                    <button
                                                        className="qty-btn"
                                                        type="button"
                                                        onClick={() => decreaseQty(item, item.quantity)}
                                                    >
                                                        −
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="qty-input"
                                                        value={item?.quantity}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="qty-btn"
                                                        type="button"
                                                        onClick={() => increaseQty(item, item.quantity)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="cart-item-total">
                                                    <span>Subtotal</span>
                                                    <strong>RM {(item?.price * item?.quantity).toFixed(2)}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-12 col-lg-4">
                                <div className="cart-summary-card glass-panel">
                                    <div className="summary-header">
                                        <div>
                                            <p className="cart-eyebrow">Order summary</p>
                                            <h4>Stay in the glow</h4>
                                        </div>
                                        <span className="pill">Secured</span>
                                    </div>
                                    <div className="summary-line">
                                        <span>Items</span>
                                        <span>{totalUnits} pcs</span>
                                    </div>
                                    <div className="summary-line">
                                        <span>Shipping</span>
                                        <span className="muted">Calculated at next step</span>
                                    </div>
                                    <div className="summary-line total">
                                        <span>Total</span>
                                        <span>RM {totalAmount.toFixed(2)}</span>
                                    </div>
                                    <button
                                        id="checkout_btn"
                                        className="btn-cart-cta w-100"
                                        type="button"
                                        onClick={checkoutHandler}
                                    >
                                        Proceed to checkout
                                    </button>
                                    <p className="summary-hint">We save your cart with every change. No surprises.</p>
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
