import React from 'react'
import Marquee from 'react-fast-marquee'

const Top = () => {
    return (
        <header className='header-top-strip py-2'>
            <div className="container-xxl">
                <Marquee gradient={true} speed={40} gradientColor='#131921'>
                    <div className="row">
                        <div className="col-12">
                            <p className="text-white mb-0">
                                Free Shipping Over RM250 & Free Returns 🛒
                            </p>
                        </div>
                    </div>
                </Marquee>
            </div>
        </header>
    )
}

export default Top