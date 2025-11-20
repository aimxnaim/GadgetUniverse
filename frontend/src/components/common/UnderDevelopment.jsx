const UnderDevelopment = ({ featureName }) => {

    const subtitle = featureName === 'Blogs' ? 
        'We are adding the finishing touches to this experience. Check back soon to explore curated blogs crafted just for you.' :
        featureName === 'Wishlist & Favourites' ?
            'We are adding the finishing touches to this experience. Check back soon to explore your favourite products all in one place.' :
            'We are adding the finishing touches to this experience. Check back soon to compare products side-by-side to find the perfect fit for you.';
    return (
        <section className='under-dev-section'>
            <div className='under-dev-glow under-dev-glow-1' />
            <div className='under-dev-glow under-dev-glow-2' />
            <div className='under-dev-card'>
                <p className='under-dev-eyebrow'>Coming Soon</p>
                <h2 className='under-dev-title'>{featureName} is in progress</h2>
                <p className='under-dev-subtitle'>
                    {subtitle}
                </p>

                <div className='under-dev-pills'>
                    <span className='under-dev-pill'>Blogs</span>
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
