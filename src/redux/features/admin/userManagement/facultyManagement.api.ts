import { TQueryParam } from '../../../../types';
import { baseApi } from '../../../api/baseApi';

const facultyManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addFaculty: build.mutation({
            query: (data) => ({
                url: '/users/create-faculty',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['faculty'],
        }),
        getAllFaculties: build.query({
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
                    url: '/faculties',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['faculty'],
        }),
        getSingleFaculty: build.query({
            query: (id: string) => ({
                url: `/faculties/${id}`,
                method: 'GET',
            }),
            providesTags: ['faculty'],
        }),
        updateFaculty: build.mutation({
            query: ({ data, id }: { data: FormData; id: string }) => ({
                url: `/faculties/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['faculty'],
        }),
    }),
});

export const {
    useAddFacultyMutation,
    useGetAllFacultiesQuery,
    useGetSingleFacultyQuery,
    useUpdateFacultyMutation,
} = facultyManagementApi;
