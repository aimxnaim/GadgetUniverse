import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import { useDispatch } from 'react-redux'
import { setCartItem } from '../../actions/features/cartSlice'
import toast from 'react-hot-toast'

const ProductItemCompact = ({ product, columnSize, highlight = false, badgeText }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity] = useState(1);
    const [showQuickView, setShowQuickView] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const addToCart = (e) => {
        e.preventDefault();
        const cartItem = {
            product: product?._id,
            name: product?.name,
            price: product?.price,
            image: product?.images[0]?.url,
            stock: product?.stock,
            quantity
        };
        dispatch(setCartItem(cartItem));
        toast.success('Item added to cart');
    };

    const handleQuickView = (e) => {
        e.preventDefault();
        setShowQuickView(true);
    };

    return (
        <>
        <div className={`gr-${columnSize}`} >
            <div
                className={`product-card position-relative`}
                style={{
                    borderRadius: 16,
                    paddingBottom: '0.75rem',
                    minHeight: 360,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: highlight ? '#fffbf0' : '#f5f5f5',
                    border: highlight ? '2px solid #ffc107' : 'none',
                    boxShadow: highlight 
                        ? '0 8px 24px rgba(255, 193, 7, 0.25)' 
                        : isHovered 
                        ? '0 12px 24px rgba(0, 0, 0, 0.15)'
                        : '0 2px 8px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    cursor: 'pointer'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="wishlist-icon position-absolute" style={{ zIndex: 10 }}>
                    <Link>
                        <img src="/images/youtube/wish.svg" alt="wishlist" />
                    </Link>
                </div>
                {highlight && (
                    <span
                        className="position-absolute fw-bold"
                        style={{
                            top: 12,
                            left: 12,
                            fontSize: '0.75rem',
                            padding: '0.4rem 0.8rem',
                            zIndex: 100,
                            backgroundColor: '#111',
                            color: '#fff',
                            borderRadius: '999px',
                            letterSpacing: '0.5px',
                            pointerEvents: 'none'
                        }}
                    >
                        ⭐ {badgeText || 'Featured'}
                    </span>
                )}
                <div className="product-image" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ height: 180, overflow: 'hidden', borderRadius: '12px 12px 0 0', backgroundColor: '#f5f5f5', position: 'relative' }}>
                        <img
                            className="img-fluid w-100"
                            style={{ 
                                height: '100%', 
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                            src={product?.images[0] ? product?.images[0].url : '/images/default_product.png'}
                            alt={product?.name}
                            loading="lazy"
                        />
                    </div>
                </div>
                <div className={`product-details align-items-center d-flex`} style={{ flex: 1 }}>
                    <div className="d-flex flex-column px-3 w-100">
                        <h6 className={`product-card-brand text-truncate`} style={{ fontSize: '0.85rem', color: '#111', fontWeight: '700', marginBottom: '0.25rem', letterSpacing: '0.2px' }}>
                            {product?.seller.length > 8 ? product?.seller.substring(0, 10) + "..." : product?.seller}
                        </h6>
                        <h5 className="product-card-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                            <Link to={`${product?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {product?.name}
                            </Link>
                        </h5>
                        <div className="ratings d-flex mb-2">
                            <StarRatings
                                rating={product?.ratings}
                                starRatedColor="#111"
                                numberOfStars={5}
                                name='rating'
                                starDimension='15px'
                                starSpacing='1px'
                            />
                            <span id="no_of_reviews" className="reviewNum ps-1" style={{ fontSize: '0.75rem', color: '#999' }}>
                                ({product?.numOfReviews})
                            </span>
                        </div>
                        <p className={`product-card-price mb-0 ${highlight ? 'fw-bold' : 'fw-semibold'}`} style={{ 
                            fontSize: highlight ? '1.1rem' : '1rem', 
                            color: '#111'
                        }}>RM {product?.price}</p>
                    </div>
                </div>
                <div className="action-bar position-absolute" style={{ opacity: isHovered ? 1 : 0.8, zIndex: 50 }}>
                    <div className="d-flex flex-column gap-10">
                        <Link onClick={() => toast.info('Compare feature coming soon!')} style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            <img src="/images/youtube/prodcompare.svg" alt="compare" />
                        </Link>
                        <Link onClick={handleQuickView} style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            <img src="/images/youtube/view.svg" alt="view" />
                        </Link>
                        <Link onClick={addToCart} style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            <img src="/images/youtube/add-cart.svg" alt="addToCart" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            {showQuickView && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowQuickView(false)}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Quick View</h5>
                                <button type="button" className="btn-close" onClick={() => setShowQuickView(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img
                                            className="img-fluid"
                                            src={product?.images[0]?.url || '/images/default_product.png'}
                                            alt={product?.name}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <h4>{product?.name}</h4>
                                        <p className="text-muted">{product?.seller}</p>
                                        <div className="ratings d-flex mb-3">
                                            <StarRatings
                                                rating={product?.ratings}
                                                starRatedColor="#ffb829"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension='20px'
                                                starSpacing='2px'
                                            />
                                            <span className="ms-2">({product?.numOfReviews} reviews)</span>
                                        </div>
                                        <h3 className="text-primary mb-3">RM {product?.price}</h3>
                                        <p>{product?.description?.substring(0, 200)}...</p>
                                        <p className={`${product?.stock > 0 ? 'text-success' : 'text-danger'}`}>
                                            {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </p>
                                        <div className="d-flex gap-2 mt-3">
                                            <button className="btn btn-primary" onClick={addToCart} disabled={product?.stock === 0}>
                                                Add to Cart
                                            </button>
                                            <button className="btn btn-outline-primary" onClick={() => {
                                                setShowQuickView(false);
                                                navigate(`${product?._id}`);
                                            }}>
                                                View Full Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

export default ProductItemCompact;
