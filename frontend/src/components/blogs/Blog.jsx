import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'
import BlogCard from '../home/BlogCard'
import BlogFilter from './BlogFilter'
import { useGetBlogsQuery } from '../../actions/api/blogApi'
import Loader from '../layout/Loader'
import toast from 'react-hot-toast'
import CustomPagination from '../layout/CustomPagination'

const Blog = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error, isError } = useGetBlogsQuery({ page: currentPage });

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || 'Failed to load blogs');
        }
    }, [isError, error]);

    if (isLoading) return <Loader />;

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <MetaData title={'Blogs'} />
            <BreadCrumb title='Blogs' />
            <div className="blog-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3">
                            <BlogFilter />
                        </div>
                        <div className="col-9">
                            {data?.blogs?.length === 0 ? (
                                <div className="text-center py-5">
                                    <h4>No blogs found</h4>
                                    <p>Check back later for new articles!</p>
                                </div>
                            ) : (
                                <>
                                    <div className="row">
                                        {data?.blogs?.map((blog) => (
                                            <div key={blog._id} className="col-6 mb-4">
                                                <BlogCard blog={blog} />
                                            </div>
                                        ))}
                                    </div>
                                    <CustomPagination
                                        resPerPage={data?.resPerPage}
                                        filteredProductsCount={data?.filterBlogCount}
                                        setCurrentPage={setCurrentPageNo}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog