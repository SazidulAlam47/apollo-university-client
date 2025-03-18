import { Key } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useGetAllAcademicSemestersQuery } from '../../../redux/features/admin/academicManagement/academicManagementApi';

interface DataType {
    key: Key;
    name: string;
    age: number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Code',
        dataIndex: 'code',
    },
    {
        title: 'Year',
        dataIndex: 'year',
    },
    {
        title: 'Start Month',
        dataIndex: 'startMonth',
    },
    {
        title: 'End Month',
        dataIndex: 'endMonth',
    },
];

const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra,
) => {
    console.log('params', pagination, filters, sorter, extra);
};

const AcademicSemester = () => {
    const { data: semesterData, isLoading } =
        useGetAllAcademicSemestersQuery(undefined);

    console.log({ semesterData, isLoading });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Table<DataType>
                columns={columns}
                dataSource={semesterData.data}
                onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
        </>
    );
};

export default AcademicSemester;
