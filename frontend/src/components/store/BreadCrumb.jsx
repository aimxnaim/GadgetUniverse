import React from 'react'
import { NavLink } from 'react-router-dom'
import { useGetProductsQuery } from '../../actions/api/productsApi';

const BreadCrumb = (props) => {
    const { title, keyword } = props;
    const params = { keyword };
    console.log(params);

    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    return (
        <div className="breadcrumb py-3 mb-0">
            <div className="container-xxl">
                <div className="breadcrumb-inner ">
                    <div className="row">
                        <div className="col-3">
                            <nav aria-label="breadcrumb" >
                                <ol className="breadcrumb mb-0">
                                    <li key='1' className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                    <li key='2' className="breadcrumb-item active" aria-current="page">{title} {params.keyword}</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="col-9">
                            {keyword && (
                                <h3 id="products_heading"  >
                                    {
                                        keyword
                                            ? `${data?.products?.length} Products found with keyword ${keyword}`
                                            : 'Latest Products'
                                    }
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BreadCrumb
