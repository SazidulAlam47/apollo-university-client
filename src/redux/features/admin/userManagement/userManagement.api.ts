import { TQueryParam } from '../../../../types';
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
        getAllStudents: build.query({
            query: (args: TQueryParam[]) => {
                const params = new URLSearchParams();
                if (args?.length) {
                    args.forEach((item) => {
                        if (item.value) {
                            params.append(item.name, item.value as string);
                        }
                    });
                }

                return {
                    url: '/students',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['student'],
        }),
    }),
});

export const { useAddStudentMutation, useGetAllStudentsQuery } =
    userManagementApi;
