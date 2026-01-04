import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ['Blog', 'AdminBlogs', 'BlogComments'],
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: (params) => ({
                url: '/blogs',
                params: {
                    page: params?.page,
                    keyword: params?.keyword,
                    category: params?.category,
                },
            }),
            providesTags: ['Blog']
        }),
        getBlogDetails: builder.query({
            query: (id) => `/blogs/${id}`,
            providesTags: ['Blog', 'BlogComments']
        }),
        getBlogComments: builder.query({
            query: (id) => `/blogs/${id}/comments`,
            providesTags: ['BlogComments']
        }),
        createBlog: builder.mutation({
            query(body) {
                return {
                    url: '/blogs',
                    method: 'POST',
                    body
                };
            },
            invalidatesTags: ['Blog', 'AdminBlogs']
        }),
        addBlogComment: builder.mutation({
            query({ id, comment }) {
                return {
                    url: `/blogs/${id}/comments`,
                    method: 'POST',
                    body: { comment }
                };
            },
            invalidatesTags: ['Blog', 'BlogComments']
        }),
        getAdminBlogs: builder.query({
            query: () => `/admin/blogs`,
            providesTags: ['AdminBlogs']
        }),
        updateBlog: builder.mutation({
            query({ id, body }) {
                return {
                    url: `/admin/blogs/${id}`,
                    method: 'PUT',
                    body
                };
            },
            invalidatesTags: ['Blog', 'AdminBlogs']
        }),
        deleteBlog: builder.mutation({
            query(id) {
                return {
                    url: `/admin/blogs/${id}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['Blog', 'AdminBlogs']
        }),
        deleteBlogComment: builder.mutation({
            query({ id, commentId }) {
                return {
                    url: `/admin/blogs/${id}/comments?commentId=${commentId}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['Blog', 'BlogComments']
        }),
    })
});

export const {
    useGetBlogsQuery,
    useGetBlogDetailsQuery,
    useGetBlogCommentsQuery,
    useCreateBlogMutation,
    useAddBlogCommentMutation,
    useGetAdminBlogsQuery,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useDeleteBlogCommentMutation
} = blogApi;
