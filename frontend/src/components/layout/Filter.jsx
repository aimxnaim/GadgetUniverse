import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getPriceQueryParams } from '../../helpers/helpers'
import { PRODUCT_CATEGORIES } from '../../constants/constants'
import StarRatings from 'react-star-ratings'

const Filter = () => {
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const navigate = useNavigate()
    let [searchParams] = useSearchParams()

    useEffect(() => {
        searchParams.has('min') && setMin(searchParams.get('min'))
        searchParams.has('max') && setMax(searchParams.get('max'))
    }, [searchParams])

    // Handle category & ratings filter
    const handleClick = (checkbox) => {
        const checkboxes = document.getElementsByName(checkbox.name)
        checkboxes.forEach((item) => {
            item !== checkbox && (item.checked = false)

            if (checkbox.checked === false) {
                // Delete the unchecked checkbox from the URL
                if (searchParams.has(checkbox.name)) {
                    searchParams.delete(checkbox.name)
                    
                    // Also remove rating range params
                    if (checkbox.name === 'ratings') {
                        searchParams.delete('minRating')
                        searchParams.delete('maxRating')
                    }
                    
                    const path = window.location.pathname + "?" + searchParams.toString()
                    navigate(path)
                }
            } else {
                // Handle ratings with ranges
                if (checkbox.name === 'ratings') {
                    const rating = parseInt(checkbox.value)
                    let minRating, maxRating
                    
                    // Define rating ranges
                    switch(rating) {
                        case 5:
                            minRating = 4.0
                            maxRating = 5.0
                            break
                        case 4:
                            minRating = 3.0
                            maxRating = 3.99
                            break
                        case 3:
                            minRating = 2.0
                            maxRating = 2.99
                            break
                        case 2:
                            minRating = 1.0
                            maxRating = 1.99
                            break
                        case 1:
                            minRating = 0
                            maxRating = 0.99
                            break
                        default:
                            minRating = 0
                            maxRating = 5
                    }
                    
                    searchParams.set('ratings', checkbox.value)
                    searchParams.set('minRating', minRating)
                    searchParams.set('maxRating', maxRating)
                } else {
                    // Set the new filter if already exists in the URL
                    if (searchParams.has(checkbox.name)) {
                        searchParams.set(checkbox.name, checkbox.value)
                    } else { // Append the new filter to the URL
                        searchParams.set(checkbox.name, checkbox.value)
                    }
                }
            }

            const path = window.location.pathname + "?" + searchParams.toString()
            navigate(path)
        })
    }

    // Handle price filter
    const handleButtonClick = (e) => {
        e.preventDefault()

        searchParams = getPriceQueryParams(searchParams, 'min', min)
        searchParams = getPriceQueryParams(searchParams, 'max', max)

        const path = window.location.pathname + "?" + searchParams.toString()
        navigate(path);
    }

    const defaultCheckHandler = (category, CheckBoxValue) => {
        const value = searchParams.get(category)
        const result = CheckBoxValue === value ? true : false
        return result
    }

    const ratingRanges = {
        5: '4.0 - 5.0',
        4: '3.0 - 3.99',
        3: '2.0 - 2.99',
        2: '1.0 - 1.99',
        1: '0 - 0.99',
    }

    return (
        <>
            <div className="filter-card my-5 mb-3">
                <h3 className="filter-title mb-3">Shop by Categories</h3>
                <hr />
                {PRODUCT_CATEGORIES.map((category, index) => (
                    <div key={index} className="form-check">
                        <input
                            className="form-check-input mb-0"
                            type="checkbox"
                            name="category"
                            id={`check${index}`}
                            value={category}
                            checked={defaultCheckHandler("category", category)}
                            onChange={(e) => handleClick(e.target)}
                        />
                        <label className="form-check-label p-0" htmlFor={`check${index}`}>
                            {" "}
                            {category}
                        </label>
                    </div>
                ))}
            </div>
            <div className="filter-card mb-5">
                <h3 className="filter-title mb-3">Filter by</h3>
                <hr />
                <h5 className="subtitle">Price</h5>
                <form
                    id="filter_form"
                    onSubmit={handleButtonClick}
                >
                    <div className="d-flex align-items-center gap-10">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="0"
                                name="min"
                                value={min}
                                onChange={(e) => setMin(e.target.value)}
                            />
                            <label htmlFor="floatingInput">Min (RM)</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Max (RM)"
                                name="max"
                                value={max}
                                onChange={(e) => setMax(e.target.value)}
                            />
                            <label htmlFor="floatingInput">Max (RM)</label>

                        </div>
                        <button type="submit" className="btn btn-primary">GO</button>
                    </div>
                </form>

                <hr />
                <h5 className="subtitle">Ratings</h5>

                {[5, 4, 3, 2, 1].map((rating, index) => (
                    <div key={index} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="ratings"
                            id={`checkStar${index}`}
                            value={rating}
                            checked={defaultCheckHandler("ratings", rating)}
                            onChange={(e) => handleClick(e.target)}
                        />
                        <label className="form-check-label d-flex align-items-center justify-content-between w-100" htmlFor={`checkStar${index}`}>
                            <StarRatings
                                rating={rating}
                                starRatedColor="#ffb829"
                                numberOfStars={5}
                                name='rating'
                                starDimension='17px'
                                starSpacing='1px'
                            />
                            <span className="text-muted small ms-2">{ratingRanges[rating]}</span>
                        </label>
                    </div>
                ))}
            </div>

        </>

    )
}

export default Filter