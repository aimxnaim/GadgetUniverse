import React from 'react'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'
import UnderDevelopment from '../common/UnderDevelopment'
import StarRatings from 'react-star-ratings'

const Compare = () => {
    return (
        <>
            <MetaData title={'Compare'} />
            <BreadCrumb title='Compare Product' />
            <UnderDevelopment featureName='Product Comparison' />
            {/**
             * Previous compare layout preserved for future implementation.
             * Set the condition to true and connect to real data once comparison is available.
             */}
            {false && (
                <div className="compare-product-wrapper home-wrapper-2 py-5">
                    <div className="container-xxl">
                        <div className="row">
                            {[1, 2, 3, 4].map((item, index) => (
                                <div className="col-3" key={index}>
                                    <div className="compare-product-card position-relative">
                                        <img
                                            src="images/youtube/cross.svg"
                                            alt=""
                                            className="position-absolute cross img-fluid"
                                        />
                                        <div className="compare-card-image">
                                            <img src="images/youtube/home/smart watch.png" alt="watch" />
                                        </div>
                                        <div className="compare-product-details">
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <h5 className="title">
                                                    Apple AirPods with Charging Case (Wired)
                                                </h5>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
                                                    <StarRatings
                                                        rating={4}
                                                        starRatedColor="#ffb829"
                                                        numberOfStars={5}
                                                        name="rating"
                                                        starDimension="23px"
                                                        starSpacing="0"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="product-detail" style={{ marginTop: '10px' }}>
                                                    <h5>Price</h5>
                                                    <h6>RM 100</h6>
                                                </div>
                                                <div className="product-detail">
                                                    <h5>Availability</h5>
                                                    <h6 className='greenColor'>In Stock</h6>
                                                </div>
                                                <div className="product-detail">
                                                    <h5>Sold by</h5>
                                                    <h6>Sony</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Compare
