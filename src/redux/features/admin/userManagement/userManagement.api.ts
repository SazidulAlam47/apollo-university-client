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
        getSingleStudent: build.query({
            query: (id: string) => ({
                url: `/students/${id}`,
                method: 'GET',
            }),
            providesTags: ['student'],
        }),
        updateStudent: build.mutation({
            query: ({ data, id }: { data: FormData; id: string }) => ({
                url: `/students/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['student'],
        }),
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

export const {
    useAddStudentMutation,
    useGetAllStudentsQuery,
    useGetSingleStudentQuery,
    useUpdateStudentMutation,
    useChangeUserStatusMutation,
} = userManagementApi;
