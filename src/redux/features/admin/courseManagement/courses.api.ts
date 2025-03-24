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
        getSingleCourse: build.query({
            query: (id: string) => ({
                url: `/courses/${id}`,
                method: 'GET',
            }),
            providesTags: ['course'],
        }),
        updateCourse: build.mutation({
            query: ({ data, id }) => ({
                url: `/courses/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['course'],
        }),
        assignCourseFaculties: build.mutation({
            query: (args) => ({
                url: `/courses/${args.courseId}/assign-faculties`,
                method: 'PUT',
                body: args.data,
            }),
            invalidatesTags: ['course'],
        }),
    }),
});

export const {
    useAddCourseMutation,
    useGetAllCoursesQuery,
    useGetSingleCourseQuery,
    useUpdateCourseMutation,
    useAssignCourseFacultiesMutation,
} = coursesApi;
