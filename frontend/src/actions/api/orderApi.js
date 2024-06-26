import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ['Order', 'AdminOrders'],
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query(body) {
                return {
                    url: '/order/new',
                    method: 'POST',
                    body
                }
            }
        }),
        myOrders: builder.query({
            query: () => `/me/orders`,
            providesTags: ['Order', 'AdminOrders']
        }),
        orderDetails: builder.query({
            query: (id) => `/order/${id}`,
            providesTags: ['Order']
        }),
        stripeCheckoutSession: builder.mutation({
            query(body) {
                return {
                    url: '/payment/checkout_sessions',
                    method: 'POST',
                    body
                }
            }
        }),
        getDashboardSales: builder.query({
            query: ({ startDate, endDate }) => `/admin/get_sales?startDate=${startDate}&endDate=${endDate}`,
        }),
        getAdminOrders: builder.query({
            query: () => `/admin/orders`,
            providesTags: ['Order', 'AdminOrders']
        }),
        updateOrder: builder.mutation({
            query({ body, id }) {
                return {
                    url: `/admin/orders/${id}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['Order']
        }),
        deleteOrder: builder.mutation({
            query(id) {
                return {
                    url: `/admin/orders/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['AdminOrders']
        }),
    })
})

export const {

    useCreateNewOrderMutation,
    useStripeCheckoutSessionMutation,
    useMyOrdersQuery,
    useOrderDetailsQuery,
    useLazyGetDashboardSalesQuery,
    useGetAdminOrdersQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation

} = orderApi;