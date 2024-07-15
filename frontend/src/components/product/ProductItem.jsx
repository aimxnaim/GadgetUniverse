import React from 'react'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

const ProductItem = ({ product, columnSize }) => {
    return (
        <div className={`col-3 col-lg-${columnSize} `} >
            <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                    <Link>
                        <img src="/images/youtube/wish.svg" alt="wishlist" />
                    </Link>
                </div>
                <div className="product-image text-center ">
                    <img
                        className="img-fluid"
                        src={product?.images[0]
                            ? product?.images[0].url
                            : '/images/default_product.png'}
                        alt={product?.name}
                        loading="lazy"
                        style={{ height: '220px', width: '200px' }}
                    />
                    <img
                        className="img-fluid mx-auto"
                        src={product?.images[1]
                            ? product?.images[1].url
                            : '/images/default_product.png'}
                        alt={product?.name}
                        loading="lazy"
                        style={{ height: '220px', width: '200px' }}
                    />
                </div>
                <div className="product-details">
                    <div className="align-items-center d-flex justify-content-center flex-column">
                        <h6 className='product-card-brand py-2'>{product?.seller}</h6>
                        <h5 className="product-card-title">
                            <Link to={`products/${product?._id}`}>{product?.name}</Link>
                        </h5>
                        <div className="ratings mt-auto d-flex">
                            <StarRatings
                                rating={product?.ratings}
                                starRatedColor="#ffb829"
                                numberOfStars={5}
                                name='rating'
                                starDimension='20px'
                                starSpacing='1px'
                            />
                            <span id="no_of_reviews" className="pt-2 ps-2">
                                {" "}
                                ({product?.numOfReviews})
                            </span>
                        </div>
                        <p className="product-card-text mt-2">RM {product?.price}</p>
                        <Link
                            to={`products/${product?._id}`}
                            id="view_btn"
                            className="button-card mb-3"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
                <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-10">
                        <Link>
                            <img src="/images/youtube/prodcompare.svg" alt="compare" />
                        </Link>
                        <Link>
                            <img src="/images/youtube/view.svg" alt="view" />
                        </Link>
                        <Link>
                            <img src="/images/youtube/add-cart.svg" alt="addToCart" />
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductItem