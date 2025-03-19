import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useGetAllAcademicSemestersQuery } from '../../../redux/features/admin/academicManagement/academicManagement.api';
import { TAcademicSemester, TQueryParam } from '../../../types';
import { Key, useState } from 'react';
import { filterSemesterNames, filterYears } from '../../../constants/semester';

type TTableData = Pick<
    TAcademicSemester,
    'name' | 'year' | 'startMonth' | 'endMonth'
> & {
    key: Key;
};

const columns: TableColumnsType<TTableData> = [
    {
        title: 'Name',
        dataIndex: 'name',
        filters: filterSemesterNames,
    },
    {
        title: 'Year',
        dataIndex: 'year',
        filters: filterYears,
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

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const { data: semesterData, isFetching } =
        useGetAllAcademicSemestersQuery(params);

    const tableData = semesterData?.data?.map(
        ({ _id, name, startMonth, endMonth, year }) => ({
            key: _id,
            name,
            startMonth,
            endMonth,
            year,
        }),
    );

    const onChange: TableProps<TTableData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
        extra,
    ) => {
        // console.log('params', pagination, filters, sorter, extra);
        const queryParams: TQueryParam[] = [];

        if (extra.action === 'filter') {
            Object.keys(filters).forEach((name) => {
                filters[name]?.forEach((value) => {
                    queryParams.push({ name, value });
                });
            });
            setParams(queryParams);
        }
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Academic Semesters
            </h2>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
        </>
    );
};

export default AcademicSemester;
