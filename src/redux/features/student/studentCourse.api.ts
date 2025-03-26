import { TQueryParam } from '../../../types';
import { baseApi } from '../../api/baseApi';

const studentCourseApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        enrollCourse: build.mutation({
            query: (offeredCourse) => ({
                url: '/enrolled-courses',
                method: 'POST',
                body: { offeredCourse },
            }),
            invalidatesTags: ['studentCourse'],
        }),
        getStudentOfferedCourses: build.query({
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
                    url: '/offered-courses/my-offered-courses',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['studentCourse'],
        }),
        // getSingleFaculty: build.query({
        //     query: (id: string) => ({
        //         url: `/faculties/${id}`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['faculty'],
        // }),
        // updateFaculty: build.mutation({
        //     query: ({ data, id }: { data: FormData; id: string }) => ({
        //         url: `/faculties/${id}`,
        //         method: 'PATCH',
        //         body: data,
        //     }),
        //     invalidatesTags: ['faculty'],
        // }),
    }),
});

export const { useGetStudentOfferedCoursesQuery, useEnrollCourseMutation } =
    studentCourseApi;
