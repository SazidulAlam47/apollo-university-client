import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['studentCourse', 'me'],
        }),
        changePassword: build.mutation({
            query: (data) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: data,
            }),
        }),
        forgotPassword: build.mutation({
            query: (data) => ({
                url: '/auth/forget-password',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: build.mutation({
            query: (args) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: args.data,
                headers: {
                    Authorization: `Bearer ${args.token}`,
                },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
