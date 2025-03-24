import { TQueryParam } from '../../../../types';
import { baseApi } from '../../../api/baseApi';

const coursesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addCourse: build.mutation({
            query: (data) => ({
                url: '/courses',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['course'],
        }),
        getAllCourses: build.query({
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
                    url: '/courses',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['course'],
        }),
    }),
});

export const { useAddCourseMutation, useGetAllCoursesQuery } = coursesApi;
