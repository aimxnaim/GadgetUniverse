import React from 'react'

const Loader = () => {
    return (
        <div className='loader-container'>
            <div className='loader-wrapper'>
                <div className='loader-spinner'>
                    <div className='spinner-ring'></div>
                    <div className='spinner-ring'></div>
                    <div className='spinner-ring'></div>
                    <div className='spinner-dot'></div>
                </div>
                <p className='loader-text'>Loading...</p>
            </div>
        </div>
    )
}

export default Loader