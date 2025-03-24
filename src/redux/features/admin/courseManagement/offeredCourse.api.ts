// import { TQueryParam } from '../../../../types';
import { baseApi } from '../../../api/baseApi';

const offeredCoursesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addOfferedCourse: build.mutation({
            query: (data) => ({
                url: '/offered-courses',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['offeredCourse'],
        }),
        // getAllCourses: build.query({
        //     query: (args: TQueryParam[]) => {
        //         const params = new URLSearchParams();
        //         if (args?.length) {
        //             args.forEach((item) => {
        //                 if (item.value) {
        //                     params.append(item.name, item.value as string);
        //                 }
        //             });
        //         }
        //         return {
        //             url: '/offered-courses',
        //             method: 'GET',
        //             params,
        //         };
        //     },
        //     providesTags: ['offeredCourse'],
        // }),
        // getSingleCourse: build.query({
        //     query: (id: string) => ({
        //         url: `/offered-courses/${id}`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['offeredCourse'],
        // }),
        // updateCourse: build.mutation({
        //     query: ({ data, id }) => ({
        //         url: `/offered-courses/${id}`,
        //         method: 'PATCH',
        //         body: data,
        //     }),
        //     invalidatesTags: ['offeredCourse'],
        // }),
    }),
});

export const { useAddOfferedCourseMutation } = offeredCoursesApi;
