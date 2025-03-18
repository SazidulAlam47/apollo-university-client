import {
    TAcademicSemester,
    TQueryParam,
    TResponseRedux,
} from '../../../../types';
import { baseApi } from '../../../api/baseApi';

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
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
