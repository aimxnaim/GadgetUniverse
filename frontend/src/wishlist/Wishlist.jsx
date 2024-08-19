import React from 'react'
import MetaData from '../components/layout/MetaData'
import BreadCrumb from '../components/store/BreadCrumb'
import StarRatings from 'react-star-ratings'
import { Link } from 'react-router-dom'

const Wishlist = () => {
    return (
        <>
            <MetaData title={'Favourite Wishlist'} />
            <BreadCrumb title='Favourite Wishlist' />
            <div className="wishlist-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        {[1, 2, 3, 4].map((item, index) => (
                            <>
                                <div className="col-3" key={index}>
                                    <div className="wishlist-card w-100 position-relative">
                                        <img
                                            src="images/youtube/cross.svg"
                                            alt=""
                                            className="position-absolute cross img-fluid"
                                        />
                                        <div className="wishlist-card-image">
                                            <img src="images/youtube/home/smart watch.png" alt="watch" />
                                        </div>
                                        <div className="wishlist-product-details">
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <h5 className="title">
                                                    Apple AirPods with Charging Case (Wired)
                                                </h5>
                                                <h6 className="price">
                                                    RM 100
                                                </h6>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Link className="wishlist-button">BUY NOW</Link>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wishlist