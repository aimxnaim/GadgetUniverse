import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'

function CustomPagination({ resPerPage, filterProductCount }) {
    const [currentPage, setCurrentPage] = useState();
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // pagination logic in the CustomPagination component
    const page = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        setCurrentPage(page)

    }, [page])


    // set the current page number in the URL
    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)

        if (searchParams.has('page')) {
            searchParams.set('page', pageNumber)
        }
        else { // if there is no page query parameter in the URL then add it to the URL ; its for the first time when the page is loaded, it will not have the page query parameter and we need to add it to the URL
            searchParams.append('page', pageNumber)
        }

        const path = window.location.pathname + "?" + searchParams.toString()
        navigate(path);
    }

    return (
        <div className='d-flex justify-content-center my-5'>
            {filterProductCount > resPerPage &&
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={filterProductCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                />
            }
        </div>
    )
}

export default CustomPagination