import { Pagination, Table, TableColumnsType, TableProps } from 'antd';
import {
    TAcademicDepartment,
    TAcademicFaculty,
    TMeta,
    TQueryParam,
} from '../../../types';
import { Key, useState } from 'react';
import Loader from '../../../components/loader/Loader';
import {
    useGetAllAcademicDepartmentsQuery,
    useGetAllAcademicFacultiesQuery,
} from '../../../redux/features/admin/academicManagement/academicManagement.api';

type TTableData = Pick<TAcademicDepartment, 'name' | 'academicFaculty'> & {
    key: Key;
};

const AcademicDepartment = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const {
        data: academicDepartmentData,
        isLoading: isAcademicDepartmentLoading,
        isFetching,
    } = useGetAllAcademicDepartmentsQuery([
        { name: 'page', value: page },
        { name: 'limit', value: limit },
        ...params,
    ]);

    const { data: academicFacultyData, isLoading: isAcademicFacultyLoading } =
        useGetAllAcademicFacultiesQuery([]);

    if (isAcademicDepartmentLoading || isAcademicFacultyLoading) {
        return <Loader />;
    }

    const meta = academicDepartmentData.meta as TMeta;

    const filterAcademicFaculty = academicFacultyData!.data?.map(
        ({ _id, name }: TAcademicFaculty) => ({
            value: _id,
            text: name,
        }),
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '50%',
        },
        {
            title: 'Academic Faculty',
            dataIndex: 'academicFaculty',
            width: '50%',
            filters: filterAcademicFaculty,
        },
    ];

    const tableData = academicDepartmentData!.data?.map(
        ({ _id, name, academicFaculty }: TAcademicDepartment) => ({
            key: _id,
            name,
            academicFaculty: academicFaculty.name,
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
                Academic Departments
            </h2>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
                pagination={false}
                scroll={{ x: 'max-content' }}
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

export default AcademicDepartment;
