import { TQueryParam } from '../../../types';
import { baseApi } from '../../api/baseApi';

const facultyCourseApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getFacultyOfferedCourses: build.query({
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
                    url: '/offered-courses/faculty-offered-courses',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['facultyOfferedCourse'],
        }),
        getFacultyEnrolledCourses: build.query({
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
                    url: '/enrolled-courses/faculty-enrolled-courses',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['facultyEnrolledCourse'],
        }),
        updateMarks: build.mutation({
            query: (data) => ({
                url: '/enrolled-courses/update-marks',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['facultyEnrolledCourse'],
        }),
    }),
});

export const {
    useGetFacultyOfferedCoursesQuery,
    useGetFacultyEnrolledCoursesQuery,
    useUpdateMarksMutation,
} = facultyCourseApi;
