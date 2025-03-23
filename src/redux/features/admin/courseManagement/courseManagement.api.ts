import { Key } from 'react';
import { TQueryParam } from '../../../../types';
import { baseApi } from '../../../api/baseApi';

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addSemesterRegistration: build.mutation({
            query: (data) => ({
                url: '/semester-registration',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['semesterRegistration'],
        }),
        getAllSemesterRegistration: build.query({
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
                    url: '/semester-registration',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['semesterRegistration'],
        }),
        changeSemesterStatus: build.mutation({
            query: ({
                status,
                id,
            }: {
                status: 'Ongoing' | 'Ended';
                id: Key;
            }) => ({
                url: `/semester-registration/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['semesterRegistration'],
        }),
    }),
});

export const {
    useAddSemesterRegistrationMutation,
    useGetAllSemesterRegistrationQuery,
    useChangeSemesterStatusMutation,
} = courseManagementApi;
