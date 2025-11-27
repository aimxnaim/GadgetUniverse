import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'

function CustomPagination({ resPerPage, filterProductCount }) {
    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const [currentPage, setCurrentPage] = useState(page);
    const navigate = useNavigate();

    const totalPages = Math.max(1, Math.ceil(filterProductCount / resPerPage));

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
        <div className='pagination-shell my-5'>
            {filterProductCount > resPerPage &&
                <>
                    <span className='pagination-pill-label'>Page {currentPage} of {totalPages}</span>
                    <div className='pagination-meta text-center'>
                    </div>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={filterProductCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="First"
                        lastPageText="Last"
                        pageRangeDisplayed={5}
                        innerClass="pagination custom-pagination"
                        itemClass="page-item custom-page-item"
                        linkClass="page-link custom-page-link"
                        activeClass="active custom-page-item-active"
                        activeLinkClass="custom-page-link-active"
                        disabledClass="custom-page-item-disabled"
                    />
                    <span className='pagination-meta-sub'>Showing {resPerPage} products per page</span>

                </>
            }
        </div>
    )
}

export default CustomPagination