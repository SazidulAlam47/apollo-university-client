import { Key, useState } from 'react';
import {
    TAcademicDepartment,
    TMeta,
    TQueryParam,
    TStudent,
} from '../../../types';
import {
    Button,
    Pagination,
    Table,
    TableColumnsType,
    TableProps,
    Input,
} from 'antd';
import { useGetAllStudentsQuery } from '../../../redux/features/admin/userManagement/userManagement.api';
import { Link } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import { useGetAllAcademicDepartmentsQuery } from '../../../redux/features/admin/academicManagement/academicManagement.api';

type TTableData = Pick<TStudent, '_id' | 'fullName' | 'id' | 'profileImg'> & {
    key: Key;
    academicDepartment: string;
};

const StudentsData = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [params, setParams] = useState<TQueryParam[]>([]);
    const {
        data: semesterData,
        isFetching,
        isLoading: isStudentLoading,
    } = useGetAllStudentsQuery([
        { name: 'page', value: page },
        { name: 'limit', value: limit },
        { name: 'sort', value: 'id' },
        { name: 'searchTerm', value: searchTerm },
        ...params,
    ]);

    const {
        data: academicDepartmentData,
        isLoading: isAcademicDepartmentLoading,
    } = useGetAllAcademicDepartmentsQuery([]);

    if (isStudentLoading || isAcademicDepartmentLoading) {
        return <Loader />;
    }
    const meta = semesterData.meta as TMeta;

    const filterAcademicDepartment = academicDepartmentData!.data?.map(
        ({ _id, name }: TAcademicDepartment) => ({
            value: _id,
            text: name,
        }),
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Image',
            dataIndex: 'profileImg',
            width: '5%',
            render: (value) =>
                value ? (
                    <img src={value} alt="Student" style={{ width: '25px' }} />
                ) : (
                    <p>No Image </p>
                ),
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
        },
        {
            title: 'ID No.',
            dataIndex: 'id',
        },
        {
            title: 'Academic Department',
            dataIndex: 'academicDepartment',
            filters: filterAcademicDepartment,
        },
        {
            title: 'Acton',
            width: '10%',
            render: (_value, record) => (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/admin/students-data/${record.key}`}>
                        <Button>Details</Button>
                    </Link>
                    <Link to={`/admin/student-update/${record.key}`}>
                        <Button>Update</Button>
                    </Link>
                    <Button>Block</Button>
                </div>
            ),
        },
    ];

    const tableData = semesterData?.data?.map(
        ({
            _id,
            fullName,
            id,
            profileImg,
            academicDepartment: { name: academicDepartmentName },
        }: TStudent) => ({
            key: _id,
            fullName,
            id,
            profileImg,
            academicDepartment: academicDepartmentName,
        }),
    );

    const onChange: TableProps<TTableData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
        extra,
    ) => {
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
                All Students
            </h2>
            <Input.Search
                placeholder="input search text"
                onSearch={setSearchTerm}
                style={{ width: '20rem', margin: '10px 0', float: 'right' }}
            />
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

export default StudentsData;
