import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ['Product', 'AdminProducts'], // this is to cache the product details and admin products
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
    })
})

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useSubmitReviewMutation,
    useCanUserReviewQuery,
    useGetAdminProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation
} = productApi;