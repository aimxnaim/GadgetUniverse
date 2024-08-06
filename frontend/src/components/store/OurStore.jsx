import React, { useEffect, useState } from 'react'
import BreadCrumb from './BreadCrumb'
import MetaData from '../layout/MetaData'
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetProductsQuery } from '../../actions/api/productsApi';
import CustomPagination from '../layout/CustomPagination';
import ProductItem from '../product/ProductItem';
import Filter from '../layout/Filter';
import Loading from '../layout/Loader'

const OurStore = () => {
    const [grid, setGrid] = useState(3);

    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get('keyword') || '';
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const category = searchParams.get('category');
    const ratings = searchParams.get('ratings');

    const params = { page, keyword };

    min !== null && (params.min = min);
    max !== null && (params.max = max);
    category !== null && (params.category = category);
    ratings !== null && (params.ratings = ratings);

    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    useEffect(() => {
        if (isError) toast.error(error?.data?.message)
    }, [isError, error]);

    const columnSize = keyword ? 4 : 3;

    if (isLoading) return <Loading />

    return (
        <>
            <MetaData title={'Our Store'} />
            <BreadCrumb title='Our Store' />
            <section className='store-wrapper home-wrapper-2'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3">
                            <Filter />
                        </div>
                        <div className="col-9">
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
<<<<<<< HEAD
                                        <p className="totalproducts"> Products</p>
=======
                                        <p className="totalproducts">{data?.products?.length} Products</p>
>>>>>>> 74d3dfd3035b01fffb5226eff1ade144013fc432
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
                            <section id="products">
                                <div className="row">
                                    {data?.products?.map((product, index) => (
                                        <ProductItem key={product.id || index} product={product} columnSize={grid} />
                                    ))}

                                </div>
                            </section>

                            <CustomPagination
                                resPerPage={data?.resPerPage}
                                filterProductCount={data?.filterProductCount}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OurStore