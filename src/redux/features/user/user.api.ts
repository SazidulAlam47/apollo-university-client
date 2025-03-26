import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query({
            query: () => ({
                url: '/users/me',
                method: 'GET',
            }),
            providesTags: ['me'],
        }),
    }),
});

export const { useGetMeQuery } = authApi;
