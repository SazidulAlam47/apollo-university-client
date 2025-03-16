import { baseApi } from '../../api/baseApi';

const academicSemesterApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllAcademicSemesters: build.query({
            query: () => ({
                url: '/academic-semester',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetAllAcademicSemestersQuery } = academicSemesterApi;
