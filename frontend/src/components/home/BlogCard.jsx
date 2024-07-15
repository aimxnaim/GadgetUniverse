import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = () => {
    return (
        <>
            <div className="col-3">
                <div className="blog-card">
                    <div className="card-image">
                        <img
                            src="/images/youtube/blog-1.jpg"
                            alt=""
                            className='img-fluid'
                        />
                    </div>
                    <div className="blog-content">
                        <p className="date">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <h5 className="title">A beautiful Sunday morning renaissance</h5>
                        <p className="desc">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <Link to='/' className='button mb-2'>
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard