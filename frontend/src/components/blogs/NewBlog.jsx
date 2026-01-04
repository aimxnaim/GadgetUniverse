import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateBlogMutation } from '../../actions/api/blogApi'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'
import toast from 'react-hot-toast'

const NewBlog = () => {
    const navigate = useNavigate();
    const [createBlog, { isLoading, error, isSuccess, data }] = useCreateBlogMutation();

    const [blogData, setBlogData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: '',
        status: 'published'
    });

    const categories = [
        'Technology',
        'Reviews',
        'Tutorials',
        'News',
        'Tips & Tricks',
        'Product Guides',
        'Industry Insights'
    ];

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || 'Failed to create blog');
        }
        if (isSuccess) {
            toast.success('Blog created successfully');
            navigate(`/blogs/${data?.blog?._id}`);
        }
    }, [error, isSuccess, navigate, data]);

    const handleChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!blogData.title || !blogData.content) {
            toast.error('Please fill in all required fields');
            return;
        }

        const blogPayload = {
            ...blogData,
            tags: blogData.tags ? blogData.tags.split(',').map(tag => tag.trim()) : []
        };

        createBlog(blogPayload);
    };

    return (
        <>
            <MetaData title='Create New Blog' />
            <BreadCrumb title='Create New Blog' />
            <div className="new-blog-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="card p-4">
                                <h2 className="mb-4">Create New Blog Post</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">
                                            Title <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="title"
                                            value={blogData.title}
                                            onChange={handleChange}
                                            placeholder="Enter blog title"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="excerpt" className="form-label">
                                            Excerpt
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="excerpt"
                                            name="excerpt"
                                            rows="2"
                                            value={blogData.excerpt}
                                            onChange={handleChange}
                                            placeholder="Brief summary of the blog (optional)"
                                        ></textarea>
                                        <small className="text-muted">
                                            A short description that will appear in blog listings
                                        </small>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="content" className="form-label">
                                            Content <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="content"
                                            name="content"
                                            rows="10"
                                            value={blogData.content}
                                            onChange={handleChange}
                                            placeholder="Write your blog content here..."
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="category" className="form-label">
                                                Category
                                            </label>
                                            <select
                                                className="form-select"
                                                id="category"
                                                name="category"
                                                value={blogData.category}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="status" className="form-label">
                                                Status
                                            </label>
                                            <select
                                                className="form-select"
                                                id="status"
                                                name="status"
                                                value={blogData.status}
                                                onChange={handleChange}
                                            >
                                                <option value="published">Published</option>
                                                <option value="draft">Draft</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="tags" className="form-label">
                                            Tags
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="tags"
                                            name="tags"
                                            value={blogData.tags}
                                            onChange={handleChange}
                                            placeholder="Enter tags separated by commas (e.g., gadgets, technology, review)"
                                        />
                                    </div>

                                    <div className="d-flex gap-3">
                                        <button
                                            type="submit"
                                            className="button"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Creating...' : 'Create Blog Post'}
                                        </button>
                                        <button
                                            type="button"
                                            className="button border-button"
                                            onClick={() => navigate('/blogs')}
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewBlog
