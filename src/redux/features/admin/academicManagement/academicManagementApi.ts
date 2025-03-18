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
        }),
        getAllAcademicFaculties: build.query({
            query: () => ({
                url: '/academic-faculty',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetAllAcademicSemestersQuery,
    useAddAcademicSemesterMutation,
    useAddAcademicFacultyMutation,
    useGetAllAcademicFacultiesQuery,
} = academicManagementApi;
