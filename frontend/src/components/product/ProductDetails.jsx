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
import ReactImageZoom from 'react-image-zoom';

function ProductDetails() {

    const params = useParams();
    const dispatch = useDispatch()

    const [activeImg, setActiveImg] = React.useState('');
    const [quantity, setQuantity] = React.useState(1)

    const { data, isLoading, error, isError } = useGetProductDetailsQuery(params?.id);
    const product = data?.product;
    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        setActiveImg(
            product?.images[0]
                ? product?.images[0].url
                : '/images/default_product.png'
        )
    }, [product]);

    const props = {
        width: 240,
        height: 250,
        zoomWidth: 500,
        img: `${activeImg}`,
    };

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [isError, error]);

    const increaseQty = () => {
        const count = document.querySelector('.count');

        if (count.valueAsNumber >= product?.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count');

        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    const setItemToCart = () => {
        const cartItem = {
            product: product?._id,
            name: product?.name,
            price: product?.price,
            image: product?.images[0].url,
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
            <BreadCrumb />
            <div className="home-wrapper-2 py-5">
                <div className="container-xxl bg-white p-4 product-detail-wrapper  ">
                    <div className="row ">
                        <div className="col-6 product-detail-image">
                            <div id="product-detail-img">
                                <ReactImageZoom {...props} />

                            </div>
                            <div className="other-product-img d-flex flex-wrap mt-5 gap-15">
                                {product?.images?.map((image) => (
                                    <div key={image.public_id} className="mt-2">
                                        <a role="button">
                                            <img
                                                className={`rounded p-3 cursor-pointer ${image.url === activeImg ? "border-purple" : ""}`}
                                                height="150"
                                                width="150"
                                                src={image.url}
                                                alt={product?.name + ' Image'}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setActiveImg(image.url)}
                                            />
                                        </a>
                                    </div>

                                ))}

                            </div>
                        </div>

                        <div className="col-6">
                            <div className="main-product-details">
                                <h3>{product?.name}</h3>
                                <p id="product_id">Product ID: #{product?._id}</p>

                                <hr />
                                <p id="product_price">RM {product?.price}</p>
                                <hr />
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

                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                    <input
                                        type="number"
                                        className="form-control count d-inline"
                                        value={quantity}
                                        readOnly
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48" onClick={increaseQty}>
                                        <linearGradient id="dyoR47AMqzPbkc_5POASHa_aWZy3jlAFSa9_gr1" x1="9.858" x2="38.142" y1="-27.858" y2="-56.142" gradientTransform="matrix(1 0 0 -1 0 -18)" gradientUnits="userSpaceOnUse">
                                            <stop offset="0" stopColor="#9dffce"></stop>
                                            <stop offset="1" stopColor="#50d18d"></stop>
                                        </linearGradient><path fill="url(#dyoR47AMqzPbkc_5POASHa_aWZy3jlAFSa9_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                                        <path d="M34,21h-7v-7c0-1.105-0.895-2-2-2h-2c-1.105,0-2,0.895-2,2v7h-7	c-1.105,0-2,0.895-2,2v2c0,1.105,0.895,2,2,2h7v7c0,1.105,0.895,2,2,2h2c1.105,0,2-0.895,2-2v-7h7c1.105,0,2-0.895,2-2v-2	C36,21.895,35.105,21,34,21z" opacity=".05"></path>
                                        <path d="M34,21.5h-7.5V14c0-0.828-0.672-1.5-1.5-1.5h-2	c-0.828,0-1.5,0.672-1.5,1.5v7.5H14c-0.828,0-1.5,0.672-1.5,1.5v2c0,0.828,0.672,1.5,1.5,1.5h7.5V34c0,0.828,0.672,1.5,1.5,1.5h2	c0.828,0,1.5-0.672,1.5-1.5v-7.5H34c0.828,0,1.5-0.672,1.5-1.5v-2C35.5,22.172,34.828,21.5,34,21.5z" opacity=".07"></path>
                                        <linearGradient id="dyoR47AMqzPbkc_5POASHb_aWZy3jlAFSa9_gr2" x1="22" x2="26" y1="24" y2="24" gradientUnits="userSpaceOnUse"><stop offset=".824" stopColor="#135d36"></stop>
                                            <stop offset=".931" stopColor="#125933"></stop>
                                            <stop offset="1" stopColor="#11522f"></stop>
                                        </linearGradient>
                                        <path fill="url(#dyoR47AMqzPbkc_5POASHb_aWZy3jlAFSa9_gr2)" d="M23,13h2c0.552,0,1,0.448,1,1v20c0,0.552-0.448,1-1,1h-2c-0.552,0-1-0.448-1-1V14	C22,13.448,22.448,13,23,13z"></path>
                                        <linearGradient id="dyoR47AMqzPbkc_5POASHc_aWZy3jlAFSa9_gr3" x1="13" x2="35" y1="24" y2="24" gradientUnits="userSpaceOnUse">
                                            <stop offset=".824" stopColor="#135d36"></stop>
                                            <stop offset=".931" stopColor="#125933"></stop>
                                            <stop offset="1" stopColor="#11522f"></stop>
                                        </linearGradient>
                                        <path fill="url(#dyoR47AMqzPbkc_5POASHc_aWZy3jlAFSa9_gr3)" d="M35,23v2c0,0.552-0.448,1-1,1H14c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h20	C34.552,22,35,22.448,35,23z"></path>
                                    </svg>
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

                                <hr />

                                <p>
                                    Status: <span id="stock_status" className={product?.stock > 0 ? 'greenColor' : 'redColor'}>
                                        {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </p>

                                <hr />

                                <p id="product_seller mb-3">Sold by: {product?.seller}</p>
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