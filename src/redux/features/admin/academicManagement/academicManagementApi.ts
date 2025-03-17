import { baseApi } from '../../../api/baseApi';

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllAcademicSemesters: build.query({
            query: () => ({
                url: '/academic-semester',
                method: 'GET',
            }),
        }),
        addAcademicSemester: build.mutation({
            query: (data) => ({
                url: '/academic-semester',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetAllAcademicSemestersQuery,
    useAddAcademicSemesterMutation,
} = academicManagementApi;
