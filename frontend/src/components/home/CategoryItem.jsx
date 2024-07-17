import React from 'react'

const CategoryItem = ({ title, count, imgSrc }) => {
    return (
        <div className='d-flex align-items-center '>
            <div>
                <h6>{title}</h6>
                <p>{count} items</p>
            </div>
            <img
                src={imgSrc}
                alt={title}
                style={{ width: '100px', height: '100px' }}
                loading="lazy"
            />
        </div>
    )
}

export default CategoryItem