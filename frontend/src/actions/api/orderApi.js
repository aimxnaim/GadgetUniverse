import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
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
        }),
        orderDetails: builder.query({
            query: (id) => `/order/${id}`,
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
    })
})

export const {

    useCreateNewOrderMutation,
    useStripeCheckoutSessionMutation,
    useMyOrdersQuery,
    useOrderDetailsQuery

} = orderApi;