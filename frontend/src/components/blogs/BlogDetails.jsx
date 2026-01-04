import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBlogDetailsQuery, useAddBlogCommentMutation } from '../../actions/api/blogApi'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'
import Loader from '../layout/Loader'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const BlogDetails = () => {
    const { id } = useParams();
    const [comment, setComment] = useState('');

    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const { data, isLoading, error, isError } = useGetBlogDetailsQuery(id);
    const [addComment, { isLoading: isCommentLoading, error: commentError, isSuccess }] = useAddBlogCommentMutation();

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || 'Failed to load blog');
        }
        if (commentError) {
            toast.error(commentError?.data?.message || 'Failed to add comment');
        }
        if (isSuccess) {
            toast.success('Comment added successfully');
            setComment('');
        }
    }, [isError, error, commentError, isSuccess]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            toast.error('Please enter a comment');
            return;
        }
        addComment({ id, comment });
    };

    if (isLoading) return <Loader />;

    const blog = data?.blog;
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <MetaData title={blog?.title || 'Blog Details'} />
            <BreadCrumb title={blog?.title} />
            <div className="blog-details-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="blog-detail-card">
                                {blog?.image?.url && (
                                    <div className="blog-image mb-4">
                                        <img
                                            src={blog.image.url}
                                            alt={blog.title}
                                            className='img-fluid w-100'
                                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                                <div className="blog-header mb-3">
                                    <h1 className="title mb-3">{blog?.title}</h1>
                                    <div className="blog-meta d-flex gap-3 mb-3">
                                        <span className="text-muted">
                                            <i className="fas fa-user me-2"></i>
                                            By {blog?.author?.name || 'Admin'}
                                        </span>
                                        <span className="text-muted">
                                            <i className="fas fa-calendar me-2"></i>
                                            {formatDate(blog?.createdAt)}
                                        </span>
                                        {blog?.category && (
                                            <span className="badge bg-primary">
                                                {blog.category}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="blog-body mb-4">
                                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                                        {blog?.content}
                                    </p>
                                </div>
                                {blog?.tags && blog.tags.length > 0 && (
                                    <div className="blog-tags mb-4">
                                        <strong>Tags: </strong>
                                        {blog.tags.map((tag, index) => (
                                            <span key={index} className="badge bg-secondary me-2">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Comments Section */}
                            <div className="comments-section mt-5">
                                <h3 className="mb-4">
                                    Comments ({blog?.numOfComments || 0})
                                </h3>

                                {/* Comment Form */}
                                {isAuthenticated ? (
                                    <div className="comment-form mb-4">
                                        <form onSubmit={handleCommentSubmit}>
                                            <div className="mb-3">
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    placeholder="Write your comment..."
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    disabled={isCommentLoading}
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                className="button"
                                                disabled={isCommentLoading}
                                            >
                                                {isCommentLoading ? 'Posting...' : 'Post Comment'}
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="alert alert-info">
                                        Please login to post a comment
                                    </div>
                                )}

                                {/* Comments List */}
                                {blog?.comments && blog.comments.length > 0 ? (
                                    <div className="comments-list">
                                        {blog.comments.map((comment) => (
                                            <div key={comment._id} className="comment-item card mb-3 p-3">
                                                <div className="d-flex gap-3">
                                                    <div className="comment-avatar">
                                                        <img
                                                            src={comment.user?.avatar?.url || '/images/default-avatar.png'}
                                                            alt={comment.name}
                                                            className="rounded-circle"
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                    <div className="comment-content flex-grow-1">
                                                        <div className="d-flex justify-content-between">
                                                            <h6 className="mb-1">{comment.name}</h6>
                                                            <small className="text-muted">
                                                                {formatDate(comment.createdAt)}
                                                            </small>
                                                        </div>
                                                        <p className="mb-0">{comment.comment}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted">No comments yet. Be the first to comment!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetails
