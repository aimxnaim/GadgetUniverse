import React from 'react';
import { useGetProductsQuery } from '../../actions/api/productsApi';
import { useSearchParams, useNavigate } from 'react-router-dom';

const FilterSort = ({ grid, setGrid }) => {

    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get('keyword') || '';
    const sort = searchParams.get('sort') || '';
    const gridParam = searchParams.get('grid') || '';
    
    // Get filter parameters
    const category = searchParams.get('category') || '';
    const ratings = searchParams.get('ratings') || '';
    const minRating = searchParams.get('minRating') || '';
    const maxRating = searchParams.get('maxRating') || '';
    const min = searchParams.get('min') || '';
    const max = searchParams.get('max') || '';
    
    const params = { page, keyword };
    sort && (params.sort = sort);
    gridParam && (params.grid = gridParam);
    category && (params.category = category);
    ratings && (params.ratings = ratings);
    minRating && (params.minRating = minRating);
    maxRating && (params.maxRating = maxRating);
    min && (params.min = min);
    max && (params.max = max);

    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    const handleSort = (sortValue) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort', sortValue);
        newParams.set('page', 1);
        const path = window.location.pathname + "?" + newParams.toString();
        navigate(path);
    }

    const handleGridChange = (columnCount) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('grid', columnCount);
        newParams.set('page', 1);
        const path = window.location.pathname + "?" + newParams.toString();
        navigate(path);
    }


    return (
        <div className="filter-sort-grid my-5 mb-4">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: '100px' }}>Sort By:</p>
                    <select
                        className="form-control form-select"
                        value={sort}
                        onChange={(e) => handleSort(e.target.value)}
                    >
                        <option value="">Default</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="popular">Popular</option>
                        <option value="title-ascending">Alphabetically, A-Z</option>
                        <option value="title-descending">Alphabetically, Z-A</option>
                        <option value="price-ascending">Price, low to high</option>
                        <option value="price-descending">Price, high to low</option>
                        <option value="rating-ascending">Rating, low to high</option>
                        <option value="rating-descending">Rating, high to low</option>
                    </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                    {/* Badge is here showing products per page count */}
                    <p className="m-2 mx-3 small badge bg-secondary bg-pilled">{data?.filterProductCount} { data?.filterProductCount > 0 ? 'total products found' : 'No' } 
                    </p>
                    <div className="d-flex align-items-center gap-10 grid">
                        {[12, 6, 4, 3].map((item, index) => (
                            <img
                                key={index}
                                onClick={() => handleGridChange(item)}
                                src={`/images/grid/gr${index + 1}.svg`}
                                alt={`grid${index + 1}`}
                                className='d-block img-fluid'
                                style={{ cursor: 'pointer', opacity: grid === item ? 1 : 0.5 }}
                                title={`${item} columns`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterSort;
