import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

<<<<<<< Updated upstream
const ProductItem = ({ product, columnSize }) => {
    let location = useLocation();
    return (
<<<<<<< HEAD
        <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3`} >
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product?.images[0]
                        ? product?.images[0].url
                        : '/images/default_product.png'}
                    alt={product?.name}
                />
                <div
                    className="card-body ps-3 d-flex justify-content-center flex-column"
                >
                    <h5 className="card-title">
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
                    <p className="card-text mt-2">${product?.price}</p>
                    <Link
                        to={`products/${product?._id}`}
                        id="view_btn"
                        className="btn btn-block"
                    >
                        View Details
=======
const ProductItem = ({ product, columnSize, keyword }) => {
    let location = useLocation();
    return (
        <div className={location.pathname === '/store' ? `gr-${columnSize}` : 'col-3'} >
            <div className={`product-card position-relative ${keyword && 'my-5'}`}>
                <div className="wishlist-icon position-absolute">
                    <Link>
                        <img src="/images/youtube/wish.svg" alt="wishlist" />
>>>>>>> Stashed changes
=======
        <div className={location.pathname === '/store' ? `gr-${columnSize}` : 'col-3'} >
            <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                    <Link>
                        <img src="/images/youtube/wish.svg" alt="wishlist" />
>>>>>>> 74d3dfd3035b01fffb5226eff1ade144013fc432
                    </Link>
                </div>
                <div className="product-image">
                    <img
                        className="img-fluid"
                        src={product?.images[0]
                            ? product?.images[0].url
                            : '/images/default_product.png'}
                        alt={product?.name}
                        loading="lazy"
                    />
                    <img
                        className="img-fluid"
                        src={product?.images[1]
                            ? product?.images[1].url
                            : '/images/default_product.png'}
                        alt={product?.name}
                        loading="lazy"

                    />
                </div>
                <div className={`product-details ${(columnSize === 12) && 'align-items-center d-flex'} ${(columnSize === 6) && 'align-items-center d-flex'}`}>
                    <div className="d-flex flex-column px-2">
                        <h6 className={`product-card-brand ${columnSize === 12 && 'mt-2'}`}>{product?.seller.length > 8 ? product?.seller?.substring(0, 10) + "..." : product?.seller}</h6>
                        <h5 className={`product-card-title `}>
                            <Link to={`products/${product?._id}`} >{product?.name.length > 35 ? product.name.substring(0, 35) + "..." : product?.name}</Link>
                        </h5>
                        {columnSize === 12 && (
                            <p className="product-card-text">
                                {product?.description.length > 100 ? product.description.substring(0, 100) + "..." : product?.description}
                            </p>
                        )}
                        <div className="ratings d-flex">
                            <StarRatings
                                rating={product?.ratings}
                                starRatedColor="#ffb829"
                                numberOfStars={5}
                                name='rating'
                                starDimension='17px'
                                starSpacing='1px'
                            />
                            <span id="no_of_reviews" className="reviewNum ps-2">
                                {" "}
                                ({product?.numOfReviews})
                            </span>
                        </div>
                        <p className="product-card-price mb-0">RM {product?.price}</p>

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