import { baseApi } from '../../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addStudent: build.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['student'],
        }),
    }),
});

export const { useAddStudentMutation } = userManagementApi;
