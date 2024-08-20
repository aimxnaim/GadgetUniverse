import React from 'react'
import MetaData from './MetaData'

const NotFound = () => {
    return (
        <>
            <MetaData title={'Not Found'} />
            <div className="row" style={{ margin: '50px 0' }}>
                <div className="d-flex justify-content-center page-not-found-wrapper">
                    <img
                        src="/images/404.svg"
                        height="550"
                        width="550"
                        alt="404_not_found"
                    />
                </div>
                <h5 className="text-center">
                    Page Not Found. Go to <a href="/">Homepage</a>
                </h5>
            </div>
        </>
    )
}

export default NotFound