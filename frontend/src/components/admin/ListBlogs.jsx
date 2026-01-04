import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import { useDeleteBlogMutation, useGetAdminBlogsQuery } from '../../actions/api/blogApi'
import AdminLayout from '../layout/AdminLayout'

const ListBlogs = () => {

    const { data, isLoading, error } = useGetAdminBlogsQuery()
    const [
        deleteBlog,
        { isLoading: deleteBlogLoading, isSuccess, error: deleteBlogError }
    ] = useDeleteBlogMutation()

    useEffect(() => {
        error && toast.error(error?.data?.message)
        deleteBlogError && toast.error(deleteBlogError?.data?.message)
        isSuccess && toast.success('Blog deleted successfully')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, deleteBlogError, isSuccess])

    if (isLoading) return <Loader />

    const deleteBlogHandler = (blogId) => {
        deleteBlog(blogId)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric'
        });
    };

    const setBlogs = () => {
        const blogs = {
            columns: [
                {
                    label: 'Blog ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Author',
                    field: 'author',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Comments',
                    field: 'comments',
                    sort: 'asc'
                },
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',

                }
            ],
            rows: []
        };

        data?.blogs?.forEach(blog => {
            blogs.rows.push({
                id: blog?._id,
                title: `${blog?.title?.substring(0, 40)}...`,
                author: blog?.author?.name || 'Unknown',
                category: blog?.category || 'N/A',
                comments: blog?.numOfComments || 0,
                date: formatDate(blog?.createdAt),
                actions: (
                    <>
                        <Link to={`/blogs/${blog?._id}`} className='btn btn-outline-info'>
                            <i className='fa fa-eye'></i>
                        </Link>
                        <button
                            className='btn btn-outline-danger ms-2'
                            onClick={() => deleteBlogHandler(blog?._id)}
                            disabled={deleteBlogLoading}
                        >
                            {
                                deleteBlogLoading
                                    ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span role="status"></span>
                                        </>
                                    ) : <i className='fa fa-trash'></i>}

                        </button>
                    </>
                )
            })
        })

        return blogs
    }

    return (
        <>
            <MetaData title={'All Blogs'} />
            <AdminLayout>
                <div>
                    <h1 className="my-5">{data?.blogs?.length} Blogs</h1>

                    <MDBDataTable
                        data={setBlogs()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />
                </div>
            </AdminLayout>
        </>
    )
}

export default ListBlogs
