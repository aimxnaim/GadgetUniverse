import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getPriceQueryParams } from '../../helpers/helpers'
import { PRODUCT_CATEGORIES } from '../../constants/constants'
import StarRatings from 'react-star-ratings'

const Filter = () => {
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)

    useEffect(() => {
        searchParams.has('min') && setMin(searchParams.get('min'))
        searchParams.has('max') && setMax(searchParams.get('max'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate = useNavigate()
    let [searchParams] = useSearchParams()

    // Handle category & ratings filter
    const handleClick = (checkbox) => {
        const checkboxes = document.getElementsByName(checkbox.name)
        checkboxes.forEach((item) => {
            item !== checkbox && (item.checked = false)

            if (checkbox.checked === false) {
                // Delete the unchecked checkbox from the URL
                if (searchParams.has(checkbox.name)) {
                    searchParams.delete(checkbox.name)
                    const path = window.location.pathname + "?" + searchParams.toString()
                    navigate(path)
                }
            } else {
                // Set the new filter if already exists in the URL
                if (searchParams.has(checkbox.name)) {
                    searchParams.set(checkbox.name, checkbox.value)
                } else { // Append the new filter to the URL
                    searchParams.set(checkbox.name, checkbox.value)
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
                            defaultChecked={defaultCheckHandler("category", category)}
                            onClick={(e) => handleClick(e.target)}
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
                            defaultChecked={defaultCheckHandler("ratings", rating)}
                            onClick={(e) => handleClick(e.target)}
                        />
                        <label className="form-check-label d-flex align-items-center" htmlFor={`checkStar${index}`}>
                            <StarRatings
                                rating={rating}
                                starRatedColor="#ffb829"
                                numberOfStars={5}
                                name='rating'
                                starDimension='17px'
                                starSpacing='1px'
                            />
                        </label>
                    </div>
                ))}
            </div>

        </>

    )
}

export default Filter