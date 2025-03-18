import { ReactNode } from 'react';

export type TPath = {
    name: string;
    path?: string;
    element?: ReactNode;
    children?: Required<Pick<TPath, 'name' | 'path' | 'element'>>[];
};

export type TRoute = {
    path: string;
    element: ReactNode;
};

export type TSidebarItem = {
    key: string;
    label: ReactNode;
    children?: Pick<TSidebarItem, 'key' | 'label'>[];
};
