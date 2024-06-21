import React, { useEffect } from 'react'
import MetaData from './layout/MetaData'
import { useGetProductsQuery } from './redux/api/productsApi'
import ProductItem from './product/ProductItem'
import Loading from './layout/Loader'
import toast from 'react-hot-toast'
import CustomPagination from './layout/CustomPagination'
import { useSearchParams } from 'react-router-dom'

const Home = () => {
    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get('keyword') || '';
    const params = { page, keyword };

    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    useEffect(() => {
        if (isError) toast.error(error?.data?.message)
    }, [isError, error]);

    const columnSize = keyword ? 4 : 3;

    if (isLoading) return <Loading />
    return (
        <>
            <MetaData title={`Buy Best Products Online`}></MetaData>
            <div className="row">
                {keyword &&
                    <div className="col-6 col-md-3 mt-5">
                        <p>Filters</p>
                    </div>
                }
                <div className={keyword ? "col-6 col-sm-6 col-md-9" : "col-6 col-sm-6 col-md-12"}>
                    <h1 id="products_heading" className="text-secondary">
                        {
                            keyword
                                ? `${data?.products?.length} Products found with keyword ${keyword}`
                                : 'Latest Products'
                        }

                    </h1>

                    <section id="products" className="mt-5">
                        <div className="row">
                            {data?.products?.map((product) => (
                                <ProductItem key={product.id} product={product} columnSize={columnSize} />
                            ))}

                        </div>
                    </section>

                    <CustomPagination
                        resPerPage={data?.resPerPage}
                        filterProductCount={data?.filterProductCount}
                    />
                </div>
            </div>
        </>
    )
}

export default Home