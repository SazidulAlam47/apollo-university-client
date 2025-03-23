import { baseApi } from '../../../api/baseApi';

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // changeUserStatus: build.mutation({
        //     query: ({
        //         status,
        //         id,
        //     }: {
        //         status: 'in-progress' | 'blocked';
        //         id: string;
        //     }) => ({
        //         url: `/users/change-status/${id}`,
        //         method: 'PATCH',
        //         body: { status },
        //     }),
        //     invalidatesTags: [],
        // }),
        addSemesterRegistration: build.mutation({
            query: (data) => ({
                url: '/semester-registration',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['semesterRegistration'],
        }),
    }),
});

export const { useAddSemesterRegistrationMutation } = courseManagementApi;
