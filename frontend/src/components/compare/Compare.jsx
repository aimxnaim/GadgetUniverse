import React from 'react'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'

const Compare = () => {
    return (
        <>
            <MetaData title={'Compare'} />
            <BreadCrumb title='Compare' />
            <div className="compare-product-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3">
                            <div className="compare-product-card position-relative">
                                <img
                                    src="images/youtube/cross.svg"
                                    alt=""
                                    className="position-absolute cross img-fluid"
                                />
                                <div className="product-card-image">
                                    <img src="images/youtube/home/smart watch.png" alt="watch" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Compare