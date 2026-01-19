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
import FilterSort from '../layout/FilterSort';

const OurStore = () => {
    const [grid, setGrid] = useState(3);

    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get('keyword') || '';
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const category = searchParams.get('category');
    const ratings = searchParams.get('ratings');
    const sort = searchParams.get('sort');
    const gridParam = Number(searchParams.get('grid')) || grid;

    const params = { page, keyword, grid: gridParam };

    min !== null && (params.min = min);
    max !== null && (params.max = max);
    category !== null && (params.category = category);
    ratings !== null && (params.ratings = ratings);
    sort !== null && (params.sort = sort);

    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    useEffect(() => {
        if (isError) toast.error(error?.data?.message)
    }, [isError, error]);

    useEffect(() => {
        if (gridParam) {
            setGrid(gridParam);
        }
    }, [gridParam]);

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
                            <FilterSort grid={grid} setGrid={setGrid} />
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