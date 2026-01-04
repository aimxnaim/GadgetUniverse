import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
    const formatDate = (dateString) => {
        if (!dateString) return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    // Fallback data for when blog prop is not provided
    const defaultBlog = {
        _id: '',
        title: 'A beautiful Sunday morning renaissance',
        excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        image: { url: '/images/youtube/blog-1.jpg' },
        createdAt: new Date()
    };

    const blogData = blog || defaultBlog;

    return (
        <>
            <div className="blog-card">
                <div className="card-image">
                    <img
                        src={blogData.image?.url || '/images/youtube/blog-1.jpg'}
                        alt={blogData.title}
                        className='img-fluid w-100'
                    />
                </div>
                <div className="blog-content">
                    <p className="date">{formatDate(blogData.createdAt)}</p>
                    <h5 className="title">{blogData.title}</h5>
                    <p className="desc">
                        {blogData.excerpt || blogData.content?.substring(0, 100) + '...'}
                    </p>
                    <Link to={blogData._id ? `/blogs/${blogData._id}` : '/'} className='button mb-2'>
                        Read More
                    </Link>
                </div>
            </div>
        </>
    )
}

export default BlogCard