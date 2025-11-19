import React from 'react'

const UnderDevelopment = ({ featureName }) => {
    return (
        <section className='under-dev-section'>
            <div className='under-dev-glow under-dev-glow-1' />
            <div className='under-dev-glow under-dev-glow-2' />
            <div className='under-dev-card'>
                <p className='under-dev-eyebrow'>Coming Soon</p>
                <h2 className='under-dev-title'>{featureName} is in progress</h2>
                <p className='under-dev-subtitle'>
                    We are adding the finishing touches to this experience. Check back soon to explore curated
                    wishlists, favourites, and side-by-side comparisons crafted just for you.
                </p>

                <div className='under-dev-pills'>
                    <span className='under-dev-pill'>Wishlist</span>
                    <span className='under-dev-pill'>Favourites</span>
                    <span className='under-dev-pill'>Comparison</span>
                </div>

                <div className='under-dev-anim-row'>
                    {[1, 2, 3].map((item) => (
                        <div key={item} className='under-dev-orb' aria-hidden='true' />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default UnderDevelopment
