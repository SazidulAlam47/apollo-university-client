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
            providesTags: ['facultyCourse'],
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
            providesTags: ['facultyCourse'],
        }),
    }),
});

export const {
    useGetFacultyOfferedCoursesQuery,
    useGetFacultyEnrolledCoursesQuery,
} = facultyCourseApi;
