/* eslint-disable @typescript-eslint/no-explicit-any */

export type TResponse = {
    data?: {
        success: boolean;
        message: string;
        data: any;
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
