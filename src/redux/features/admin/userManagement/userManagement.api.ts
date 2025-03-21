import { baseApi } from '../../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        changeUserStatus: build.mutation({
            query: ({
                status,
                id,
            }: {
                status: 'in-progress' | 'blocked';
                id: string;
            }) => ({
                url: `/users/change-status/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['student', 'user'],
        }),
    }),
});

export const { useChangeUserStatusMutation } = userManagementApi;
