import { Pagination, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useGetAllAcademicSemestersQuery } from '../../../redux/features/admin/academicManagement/academicManagement.api';
import { TAcademicSemester, TMeta, TQueryParam } from '../../../types';
import { Key, useState } from 'react';
import { filterSemesterNames, filterYears } from '../../../constants/semester';
import Loader from '../../../components/loader/Loader';

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
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);

    const {
        data: semesterData,
        isFetching,
        isLoading,
    } = useGetAllAcademicSemestersQuery([
        { name: 'page', value: page },
        { name: 'limit', value: limit },
        ...params,
    ]);

    if (isLoading) {
        return <Loader />;
    }

    const meta = semesterData!.meta as TMeta;

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
                pagination={false}
            />
            <Pagination
                align="end"
                total={meta.totalData}
                pageSize={limit}
                current={page}
                onChange={setPage}
                style={{ margin: '10px 0' }}
                showSizeChanger
                pageSizeOptions={[3, 5, 10, 15, 20]}
                onShowSizeChange={(_page, limit) => setLimit(limit)}
            />
        </>
    );
};

export default AcademicSemester;
