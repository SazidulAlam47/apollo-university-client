import { BaseQueryApi } from '@reduxjs/toolkit/query';
import { Key } from 'react';

export type TMeta = {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
};

export type TSuccessResponse<T> = {
    success: boolean;
    message: string;
    data: T;
    meta?: TMeta;
};

export type TErrorResponse = {
    status: number;
    data: {
        success: boolean;
        message: string;
        errorSources: {
            path: string;
            message: string;
        }[];
    };
};

export type TResponse<T> = {
    data?: TSuccessResponse<T>;
    error?: TErrorResponse;
};

export type TResponseRedux<T> = TSuccessResponse<T> & BaseQueryApi;

export type TQueryParam = {
    name: string;
    value: boolean | Key;
};
