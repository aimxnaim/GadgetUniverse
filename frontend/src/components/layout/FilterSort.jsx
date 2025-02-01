import React from 'react';
import { useGetProductsQuery } from '../../actions/api/productsApi';
import { useSearchParams } from 'react-router-dom';

const FilterSort = ({ grid, setGrid }) => {

    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get('keyword') || '';
    const params = { page, keyword };

    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    return (
        <div className="filter-sort-grid my-5 mb-4">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: '100px' }}>Sort By:</p>
                    <select
                        name=""
                        id=""
                        className="form-control form-select"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="popular">Popular</option>
                        <option value="title-ascending">Alphabetically, A-Z</option>
                        <option value="title-descending">Alphabetically, Z-A</option>
                        <option value="price-ascending">Price, low to high</option>
                        <option value="price-descending">Price, high to low</option>
                    </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                    <p className="m-2 mx-3">{data?.products?.length} Products</p>
                    <div className="d-flex align-items-center gap-10 grid">
                        {[12, 6, 4, 3].map((item, index) => (
                            <img
                                key={index}
                                onClick={() => setGrid(item)}
                                src={`/images/grid/gr${index + 1}.svg`}
                                alt={`grid${index + 1}`}
                                className='d-block img-fluid'
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterSort;
