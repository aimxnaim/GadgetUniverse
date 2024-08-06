import React from 'react'
import { PRODUCT_CATEGORIES } from '../../constants/constants'
import { useNavigate, useSearchParams } from 'react-router-dom'

const BlogFilter = () => {
    return (
        <div className="filter-card mb-3 p-3">
            <h3 className="filter-title mb-3">Find by Categories</h3>
            <hr />
            {PRODUCT_CATEGORIES.map((category, index) => (
                <div key={index} className="form-check">
                    <input
                        className="form-check-input mb-0"
                        type="checkbox"
                        name="category"
                        id={`check${index}`}
                        value={category}
                    />
                    <label className="form-check-label p-0" htmlFor={`check${index}`}>
                        {" "}
                        {category}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default BlogFilter