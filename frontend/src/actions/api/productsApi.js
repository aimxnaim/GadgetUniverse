import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ['Product', 'AdminProducts', 'Reviews'], // this is to cache the product details and admin products
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: '/products',
                params: {
                    page: params?.page,
                    keyword: params?.keyword,
                    "price[gte]": params.min,
                    "price[lte]": params.max,
                    category: params?.category,
                    "ratings[gte]": params?.ratings,

                },
            }),
        }),
        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: ['Product']
        }),
        submitReview: builder.mutation({
            query(body) {
                return {
                    url: '/reviews',
                    method: 'PUT',
                    body
                };
            },
            invalidatesTags: ['Product']
        }),
        canUserReview: builder.query({
            query: (productId) => `/can_review/?productId=${productId}`
        }),
        getAdminProducts: builder.query({
            query: () => `/admin/products`,
            providesTags: ['AdminProducts'] // this is to cache the admin products
        }),
        createProduct: builder.mutation({
            query(body) {
                return {
                    url: '/admin/products',
                    method: 'POST',
                    body
                };
            },
            invalidatesTags: ['AdminProducts']
        }),
        updateProduct: builder.mutation({
            query({ body, productId }) {
                return {
                    url: `/admin/products/${productId}`,
                    method: 'PUT',
                    body
                };
            },
            invalidatesTags: ['AdminProducts', 'Product'] // this is to refetch the product details after updating it
        }),
        uploadProductImages: builder.mutation({
            query({ body, productId }) {
                return {
                    url: `/admin/products/${productId}/upload_images`,
                    method: 'PUT',
                    body
                };
            },
            invalidatesTags: ['Product'] // this is to refetch the product details after updating it
        }),
        deleteProductImage: builder.mutation({
            query({ body, imageId }) {
                return {
                    url: `/admin/products/${imageId}/delete_image`,
                    method: 'PUT',
                    body
                };
            },
            invalidatesTags: ['Product'] // this is to refetch the product details after updating it
        }),
        deleteProduct: builder.mutation({
            query(productId) {
                return {
                    url: `/admin/products/${productId}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['AdminProducts'] // this is to refetch the product details after updating it
        }),
        getProductReviews: builder.query({
            query: (productId) => `/reviews?id=${productId}`,
            providesTags: ['Reviews']
        }),
        deleteReview: builder.mutation({
            query({ productId, id }) {
                return {
                    url: `/admin/reviews?productId=${productId}&id=${id}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['Reviews']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useSubmitReviewMutation,
    useCanUserReviewQuery,
    useGetAdminProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImagesMutation,
    useDeleteProductImageMutation,
    useDeleteProductMutation,
    useLazyGetProductReviewsQuery, // need to call inside a useEffect to avoid infinite loop ; submitHandler
    useDeleteReviewMutation
} = productApi;