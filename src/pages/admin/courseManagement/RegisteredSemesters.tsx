import { Button, Modal, Pagination, Table, TableColumnsType, Tag } from 'antd';
import { Key, useState } from 'react';
import { TMeta, TSemesterRegistration } from '../../../types';
import {
    useChangeSemesterStatusMutation,
    useGetAllSemesterRegistrationQuery,
} from '../../../redux/features/admin/courseManagement/courseManagement.api';
import Loader from '../../../components/loader/Loader';
import moment from 'moment';
import { ExclamationCircleFilled } from '@ant-design/icons';

type TTableData = {
    key: Key;
    name: string;
    startDate: string;
    endDate: string;
    status: 'Upcoming' | 'Ongoing' | 'Ended';
};

const RegisteredSemesters = () => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [modal, contextHolder] = Modal.useModal();

    const {
        data: semesterRegistrationData,
        isFetching,
        isLoading,
    } = useGetAllSemesterRegistrationQuery([
        { name: 'page', value: page },
        { name: 'limit', value: limit },
    ]);

    const [changeSemesterStatus] = useChangeSemesterStatusMutation();

    const confirm = async (record: TTableData) => {
        modal.confirm({
            title: 'Are you sure?',
            icon: <ExclamationCircleFilled />,
            content: `Change ${record.name} to ${record.status === 'Upcoming' ? 'Ongoing' : ''}
                                ${record.status === 'Ongoing' ? 'Ended' : ''}`,
            okText: 'Yes',
            cancelText: 'Cancel',
            async onOk() {
                if (record.status === 'Upcoming') {
                    changeSemesterStatus({ status: 'Ongoing', id: record.key });
                }
                if (record.status === 'Ongoing') {
                    changeSemesterStatus({ status: 'Ended', id: record.key });
                }
            },
        });
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                let color;
                switch (status) {
                    case 'Upcoming':
                        color = 'blue';
                        break;
                    case 'Ongoing':
                        color = 'green';
                        break;
                    case 'Ended':
                        color = 'red';
                        break;
                    default:
                        break;
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            render: (date) => {
                return <>{moment(new Date(date)).format('DD MMMM, YYYY')}</>;
            },
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            render: (date) => {
                return <>{moment(new Date(date)).format('DD MMMM, YYYY')}</>;
            },
        },
        {
            title: 'Action',
            render: (_, record) => {
                if (
                    record.status === 'Upcoming' ||
                    record.status === 'Ongoing'
                ) {
                    return (
                        <>
                            <Button
                                variant="outlined"
                                color={
                                    record.status === 'Upcoming'
                                        ? 'green'
                                        : 'red'
                                }
                                onClick={() => confirm(record)}
                            >
                                Change to{' '}
                                {record.status === 'Upcoming' ? 'Ongoing' : ''}
                                {record.status === 'Ongoing' ? 'Ended' : ''}
                            </Button>
                            {contextHolder}
                        </>
                    );
                } else if (record.status === 'Ended') {
                    return <>Semester is Ended</>;
                }
            },
        },
    ];

    if (isLoading) {
        return <Loader />;
    }

    const meta = semesterRegistrationData.meta as TMeta;
    const tableData = semesterRegistrationData?.data?.map(
        ({
            _id,
            academicSemester,
            status,
            startDate,
            endDate,
        }: TSemesterRegistration) => ({
            key: _id,
            name: `${academicSemester.name} - ${academicSemester.year}`,
            status,
            startDate,
            endDate,
        }),
    );

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Registered Semesters
            </h2>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
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

export default RegisteredSemesters;
