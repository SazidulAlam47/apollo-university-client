import { Key, useState } from 'react';
import {
    TAcademicDepartment,
    TMeta,
    TQueryParam,
    TFaculty,
    TUser,
} from '../../../types';
import {
    Button,
    Pagination,
    Table,
    TableColumnsType,
    TableProps,
    Input,
    Modal,
} from 'antd';
import { useChangeUserStatusMutation } from '../../../redux/features/admin/userManagement/userManagement.api';
import { Link } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import { useGetAllAcademicDepartmentsQuery } from '../../../redux/features/admin/academicManagement/academicManagement.api';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement/facultyManagement.api';

type TTableData = Pick<
    TFaculty,
    '_id' | 'fullName' | 'id' | 'profileImg' | 'user'
> & {
    key: Key;
    academicDepartment: string;
};

const FacultiesData = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);

    const [modal, contextHolder] = Modal.useModal();

    const confirm = async (user: TUser) => {
        modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleFilled />,
            content: `Are you sure you want to ${
                user.status === 'in-progress' ? 'Block' : 'Unblock'
            } ${user.id}?`,
            okText: `${user.status === 'in-progress' ? 'Block' : 'Unblock'}`,
            cancelText: 'Cancel',
            async onOk() {
                if (user.status === 'in-progress') {
                    await changeUserStatus({
                        status: 'blocked',
                        id: user._id,
                    });
                } else if (user.status === 'blocked') {
                    await changeUserStatus({
                        status: 'in-progress',
                        id: user._id,
                    });
                }
            },
        });
    };

    const [params, setParams] = useState<TQueryParam[]>([]);
    const {
        data: semesterData,
        isFetching,
        isLoading: isFacultyLoading,
    } = useGetAllFacultiesQuery([
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

    const [changeUserStatus] = useChangeUserStatusMutation();

    if (isFacultyLoading || isAcademicDepartmentLoading) {
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
                    <img src={value} alt="Faculty" style={{ width: '25px' }} />
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
                    <Link to={`/admin/faculties-data/${record.key}`}>
                        <Button>Details</Button>
                    </Link>
                    <Link to={`/admin/faculty-update/${record.key}`}>
                        <Button>Update</Button>
                    </Link>

                    <Button onClick={() => confirm(record.user)}>
                        {record.user.status === 'in-progress'
                            ? 'Block'
                            : 'Unblock'}
                    </Button>
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
            user,
        }: TFaculty) => ({
            key: _id,
            fullName,
            id,
            profileImg,
            academicDepartment: academicDepartmentName,
            user,
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
                All Faculties
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
            {contextHolder}
        </>
    );
};

export default FacultiesData;
