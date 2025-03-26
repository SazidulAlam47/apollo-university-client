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
        getStudentEnrolledCourses: build.query({
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
                    url: '/enrolled-courses/student-enrolled-courses',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['studentCourse'],
        }),
    }),
});

export const {
    useGetStudentOfferedCoursesQuery,
    useEnrollCourseMutation,
    useGetStudentEnrolledCoursesQuery,
} = studentCourseApi;
