import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast'
import Loading from '../layout/Loader'
import StarRatings from 'react-star-ratings';
import { useGetProductDetailsQuery } from '../../actions/api/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from '../../actions/features/cartSlice';
import NewReview from '../reviews/NewReview';
import ListReviews from '../reviews/ListReviews';
import NotFound from '../layout/NotFound';
import MetaData from '../layout/MetaData';
import BreadCrumb from '../store/BreadCrumb';

function ProductDetails() {

    const params = useParams();
    const dispatch = useDispatch()

    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(1)

    const { data, isLoading, error, isError } = useGetProductDetailsQuery(params?.id);
    const product = data?.product;
    const { isAuthenticated } = useSelector(state => state.auth)

    const productImages = product?.images?.length
        ? product.images
        : [{ url: '/images/default_product.png', public_id: 'default-product' }];

    const activeImage = productImages[activeIndex] || productImages[0];

    useEffect(() => {
        setActiveIndex(0);
        setQuantity(product?.stock > 0 ? 1 : 0);
    }, [product]);

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [isError, error]);

    const increaseQty = () => {
        const max = product?.stock ?? Infinity;
        if (max <= 0) return;
        setQuantity((prev) => (prev >= max ? prev : prev + 1));
    }

    const decreaseQty = () => {
        setQuantity((prev) => (prev <= 1 ? prev : prev - 1));
    }

    const setItemToCart = () => {
        const cartItem = {
            product: product?._id,
            name: product?.name,
            price: product?.price,
            image: product?.images?.[0]?.url || '/images/default_product.png',
            stock: product?.stock,
            quantity
        }

        dispatch(setCartItem(cartItem))
        toast.success('Item added to cart')
    }

    if (isLoading) return <Loading />
    if (error && error?.status === 404) {
        return <NotFound />
    } else if (error?.status === 400) {
        return <NotFound />
    }

    return (
        <>
            <MetaData title={product?.name} />
            <BreadCrumb title={product?.name} />
            <div className="home-wrapper-2 py-5">
                <div className="container-xxl p-4 product-detail-wrapper">
                    <div className="row gy-4 align-items-start">
                        <div className="col-12 col-lg-6 product-detail-image">
                            <div className="product-gallery">
                                <div className="product-hero position-relative">
                                    <img
                                        className="w-100 h-100"
                                        src={activeImage?.url}
                                        alt={product?.name + ' Image'}
                                    />
                                    {productImages.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                className="gallery-nav nav-left"
                                                aria-label="Previous product image"
                                                onClick={() => setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length)}
                                            >
                                                &#8592;
                                            </button>
                                            <button
                                                type="button"
                                                className="gallery-nav nav-right"
                                                aria-label="Next product image"
                                                onClick={() => setActiveIndex((prev) => (prev + 1) % productImages.length)}
                                            >
                                                &#8594;
                                            </button>
                                        </>
                                    )}
                                </div>

                                {productImages.length > 1 && (
                                    <div className="other-product-img d-flex flex-wrap mt-4 gap-10">
                                        {productImages.map((image, index) => (
                                            <button
                                                key={image.public_id || index}
                                                type="button"
                                                className={`thumb-btn ${index === activeIndex ? "active" : ""}`}
                                                onClick={() => setActiveIndex(index)}
                                            >
                                                <img
                                                    className="rounded p-2"
                                                    height="90"
                                                    width="90"
                                                    src={image.url}
                                                    alt={`${product?.name || 'Product'} thumbnail ${index + 1}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="main-product-details px-4">
                                <p id="product_id" className="product-chip subtle mb-2">Product ID: #{product?._id}</p>
                                <h3 className="mb-2">{product?.name}</h3>

                                <div className="price-card mb-3">
                                    <p id="product_price" className="mb-0">RM {product?.price}</p>
                                    <span className="price-subtle">Inclusive of all taxes</span>
                                </div>

                                <div className="d-flex">
                                    <StarRatings
                                        rating={product?.ratings}
                                        starRatedColor="#ffb829"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension='24px'
                                        starSpacing='1px'
                                    />
                                    <span id="no-of-reviews" className="pt-1 ps-2"> ({product?.numOfReviews} Reviews) </span>
                                </div>
                                <hr />

                                <div className="qty-control">
                                    <button
                                        type="button"
                                        className="qty-btn"
                                        aria-label="Decrease quantity"
                                        onClick={decreaseQty}
                                        disabled={product?.stock <= 0 || quantity <= 1}
                                    >
                                        &#8722;
                                    </button>
                                    <span className="qty-value">{quantity}</span>
                                    <button
                                        type="button"
                                        className="qty-btn"
                                        aria-label="Increase quantity"
                                        onClick={increaseQty}
                                        disabled={product?.stock <= 0}
                                    >
                                        &#43;
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    id="cart_btn"
                                    className="button d-inline ms-4"
                                    disabled={product?.stock <= 0}
                                    onClick={setItemToCart}
                                >
                                    Add to Cart
                                </button>

                                <div className="d-flex flex-wrap gap-10 mt-3">
                                    <span className={`product-chip ${product?.stock > 0 ? 'chip-success' : 'chip-danger'}`} id="stock_status">
                                        {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                    <span className="product-chip muted" id="product_seller">Sold by: {product?.seller}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="description-wrapper home-wrapper-2 py-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h4 style={{ paddingLeft: '10px' }}>Description:</h4>
                            <div className="desc bg-white">
                                <p>
                                    {product?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="review-wrapper home-wrapper-2 py-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h4 style={{ paddingLeft: '10px' }}>Review:</h4>

                            <div
                                className="review-inner-wrapper review-head d-flex justify-content-between align-items-end"
                                style={{
                                    borderRadius: product?.numOfReviews === 0 ? '10px' : '10px 10px 0 0',
                                    borderBottom: product?.numOfReviews === 0 && 'none'
                                }}
                            >
                                <div>
                                    <h4 className='mb-2'>Customer&apos;s Review</h4>
                                    <div className='d-flex align-items-center gap-10'>
                                        <StarRatings
                                            rating={product?.ratings}
                                            starRatedColor="#ffb829"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension='22px'
                                            starSpacing='1px'
                                        />
                                        <p className="mt-1 mb-0">Based on {product?.numOfReviews} reviews</p>
                                    </div>
                                </div>
                                <div>
                                    {isAuthenticated
                                        ? <NewReview productId={product?._id} />
                                        : <div className="alert alert-danger mb-0" type="alert">
                                            Login to post your review.
                                        </div>
                                    }
                                </div>
                            </div>
                            {product?.reviews?.length > 0 && (
                                <div className="review-inner-wrapper" style={{ borderRadius: '0 0 20px 20px' }}>
                                    <ListReviews reviews={product?.reviews} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ProductDetails
