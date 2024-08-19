import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useGetProductsQuery } from '../../actions/api/productsApi';

const BreadCrumb = (props) => {
    const { keyword } = props;
    const params = { keyword };

    const { data } = useGetProductsQuery(params);
    const location = useLocation();

    // Get the current path and split it into parts
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div className="breadcrumb py-3 mb-0">
            <div className="container-xxl">
                <div className="breadcrumb-inner ">
                    <div className="row">
                        <div className={keyword ? "col-3" : "col-12"}>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li key='home' className="breadcrumb-item">
                                        <NavLink to="/">Home</NavLink>
                                    </li>
                                    {pathnames.map((value, index) => {
                                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                                        const isLast = index === pathnames.length - 1;

                                        // Replace %20 with a space and split words to capitalize
                                        const displayName = value
                                            .replace(/%20/g, ' ') // Replace %20 with space
                                            .split(' ') // Split into individual words
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                                            .join(' '); // Join words back with space

                                        return isLast ? (
                                            <li key={to} className="breadcrumb-item active" aria-current="page">
                                                {displayName}
                                            </li>
                                        ) : (
                                            <li key={to} className="breadcrumb-item">
                                                <NavLink to={to}>
                                                    {displayName}
                                                </NavLink>
                                            </li>
                                        );
                                    })}

                                </ol>
                            </nav>
                        </div>
                        <div className={keyword && "col-9"}>
                            {keyword && (
                                <h3 id="products_heading" style={{ marginLeft: '10px' }}>
                                    {`${data?.products?.length} products found with keyword '${keyword}'`}
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreadCrumb;
