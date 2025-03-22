import { TQueryParam } from '../../../../types';
import { baseApi } from '../../../api/baseApi';

const adminManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addAdmin: build.mutation({
            query: (data) => ({
                url: '/users/create-admin',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['admin'],
        }),
        getAllAdmins: build.query({
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
                    url: '/admins',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['admin'],
        }),
        getSingleAdmin: build.query({
            query: (id: string) => ({
                url: `/admins/${id}`,
                method: 'GET',
            }),
            providesTags: ['admin'],
        }),
        updateAdmin: build.mutation({
            query: ({ data, id }: { data: FormData; id: string }) => ({
                url: `/admins/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['admin'],
        }),
    }),
});

export const {
    useAddAdminMutation,
    useGetAllAdminsQuery,
    useGetSingleAdminQuery,
    useUpdateAdminMutation,
} = adminManagementApi;
