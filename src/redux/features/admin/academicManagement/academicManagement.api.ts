import {
    TAcademicSemester,
    TQueryParam,
    TResponseRedux,
} from '../../../../types';
import { baseApi } from '../../../api/baseApi';

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addAcademicSemester: build.mutation({
            query: (data) => ({
                url: '/academic-semester',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['academicSemester'],
        }),
        getAllAcademicSemesters: build.query({
            query: (args: TQueryParam[]) => {
                const params = new URLSearchParams();
                if (args?.length) {
                    args.forEach((item) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/academic-semester',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['academicSemester'],
            transformResponse: (
                response: TResponseRedux<TAcademicSemester[]>,
            ) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        addAcademicFaculty: build.mutation({
            query: (data) => ({
                url: '/academic-faculty',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['academicFaculty'],
        }),
        getAllAcademicFaculties: build.query({
            query: () => ({
                url: '/academic-faculty',
                method: 'GET',
            }),
            providesTags: ['academicFaculty'],
        }),
        addAcademicDepartment: build.mutation({
            query: (data) => ({
                url: '/academic-department',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['academicDepartment'],
        }),
        getAllAcademicDepartments: build.query({
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
                    url: '/academic-department',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['academicDepartment'],
        }),
    }),
});

export const {
    useAddAcademicSemesterMutation,
    useGetAllAcademicSemestersQuery,
    useAddAcademicFacultyMutation,
    useGetAllAcademicFacultiesQuery,
    useAddAcademicDepartmentMutation,
    useGetAllAcademicDepartmentsQuery,
} = academicManagementApi;
