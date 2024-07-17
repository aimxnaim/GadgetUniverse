import React from 'react'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'
import BlogCard from '../home/BlogCard'
import BlogFilter from './BlogFilter'

const Blog = () => {
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
                            <div className="row">
                                {[1, 2, 3, 4, 5, 6].map((blog, index) => (
                                    <div key={index} className="col-6 mb-4">
                                        <BlogCard />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog