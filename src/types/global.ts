/* eslint-disable @typescript-eslint/no-explicit-any */

export type TResponse = {
    data?: {
        success: boolean;
        message: string;
        data: any;
        meta?: {
            page: number;
            limit: number;
            totalData: number;
            totalPage: number;
        };
    };
    error?: {
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
};
