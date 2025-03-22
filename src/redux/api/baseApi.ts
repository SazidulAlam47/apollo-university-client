/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BaseQueryApi,
    BaseQueryFn,
    createApi,
    DefinitionType,
    FetchArgs,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import verifyToken from '../../utils/verifyToken';
import { IUser, logout, setUser } from '../features/auth/auth.slice';
import { toast } from 'sonner';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    try {
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            const res = await fetch(
                'http://localhost:5000/api/v1/auth/refresh-token',
                {
                    credentials: 'include',
                },
            );
            const data = await res.json();
            if (data.success) {
                const token = data.data.accessToken;
                const user = verifyToken(token) as IUser;
                api.dispatch(setUser({ user, token }));
                result = await baseQuery(args, api, extraOptions);
            } else {
                toast.dismiss();
                toast.error('Session timeout');
                api.dispatch(logout());
            }
        }
        return result;
    } catch (error) {
        toast.dismiss();
        toast.error('Something went wrong');
        return { error };
    }
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
    tagTypes: [
        'academicSemester',
        'academicFaculty',
        'academicDepartment',
        'student',
        'user',
        'faculty',
        'admin',
    ],
});
