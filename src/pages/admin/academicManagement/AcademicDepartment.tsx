import { Table, TableColumnsType, TableProps } from 'antd';
import {
    TAcademicDepartment,
    TAcademicFaculty,
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
    const {
        data: academicDepartmentData,
        isLoading: isAcademicDepartmentLoading,
        isFetching,
    } = useGetAllAcademicDepartmentsQuery(params);

    const { data: academicFacultyData, isLoading: isAcademicFacultyLoading } =
        useGetAllAcademicFacultiesQuery(undefined);

    if (isAcademicDepartmentLoading || isAcademicFacultyLoading) {
        return <Loader />;
    }

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
        },
        {
            title: 'Academic Faculty',
            dataIndex: 'academicFaculty',
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
            />
        </>
    );
};

export default AcademicDepartment;
