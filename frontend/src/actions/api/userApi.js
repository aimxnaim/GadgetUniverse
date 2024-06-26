import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setLoading, setUser } from '../features/userSlice'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ['User', 'AdminUsers', 'AdminUser'],
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => `/me`,
            transformResponse: (result) => result.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data))
                    dispatch(setIsAuthenticated(true))
                    dispatch(setLoading(false))
                } catch (error) {
                    dispatch(setLoading(false))
                    console.log('error', error)
                }
            },
            providesTags: ['User']
        }),
        updateProfile: builder.mutation({
            query(body) {
                return {
                    url: `/me/update`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['User']
        }),
        uploadAvatar: builder.mutation({
            query(body) {
                return {
                    url: `/me/upload_avatar`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['User']
        }),
        updatePassword: builder.mutation({
            query(body) {
                return {
                    url: `/password/update`,
                    method: 'PUT',
                    body
                }
            }
        }),
        forgotPassword: builder.mutation({
            query(body) {
                return {
                    url: `/password/forgot`,
                    method: 'POST',
                    body
                }
            }
        }),
        resetPassword: builder.mutation({
            query({ body, token }) {
                return {
                    url: `/password/reset/${token}`,
                    method: 'PUT',
                    body
                }
            }
        }),
        getAdminUsers: builder.query({
            query: () => `/admin/users`,
            providesTags: ['AdminUsers', 'AdminUser'] // this is to cache the admin products
        }),
        getUserDetails: builder.query({
            query: (userId) => `/admin/user/${userId}`,
            providesTags: ['AdminUser'] // this is to cache the admin products
        }),
        updateUser: builder.mutation({
            query({ body, userId }) {
                return {
                    url: `/admin/user/${userId}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['AdminUser']
        }),
        deleteUser: builder.mutation({
            query(userId) {
                return {
                    url: `/admin/user/${userId}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['AdminUser']
        }),
    })
})

export const {
    useGetMeQuery,
    useUpdateProfileMutation,
    useUploadAvatarMutation,
    useUpdatePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetAdminUsersQuery,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi;