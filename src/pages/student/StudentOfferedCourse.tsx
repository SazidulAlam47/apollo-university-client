import { Button, Modal, Pagination, Table, TableColumnsType } from 'antd';
import { Key, useState } from 'react';
import Loader from '../../components/loader/Loader';
import { TMeta, TOfferedCourse, TResponse } from '../../types';
import {
    useEnrollCourseMutation,
    useGetStudentOfferedCoursesQuery,
} from '../../redux/features/student/studentCourse.api';
import { toast } from 'sonner';

type TTableData = {
    key: Key;
    course: string;
    faculty: string;
    section: number;
    startTime: string;
    endTime: string;
};

const StudentOfferedCourse = () => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [modal, contextHolder] = Modal.useModal();
    const [enrollCourse] = useEnrollCourseMutation();

    const {
        data: offeredCourseData,
        isFetching,
        isLoading,
    } = useGetStudentOfferedCoursesQuery([
        { name: 'page', value: page },
        { name: 'limit', value: limit },
    ]);

    if (isLoading) {
        return <Loader />;
    }

    const confirm = async (record: TTableData) => {
        modal.confirm({
            title: 'Confirm',
            content: `Are you sure want to Enroll: ${record.course} - faculty: ${record.faculty} - section: ${record.section}?`,
            okText: 'Enroll Now',
            cancelText: 'Cancel',
            width: '40rem',
            async onOk() {
                const res = (await enrollCourse(record.key)) as TResponse<null>;
                if (res.data) {
                    toast.success(res.data.message);
                } else if (res.error) {
                    toast.error(res.error.data.message);
                }
            },
        });
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Course Title',
            dataIndex: 'course',
        },
        {
            title: 'Faculty',
            dataIndex: 'faculty',
        },
        {
            title: 'Section',
            dataIndex: 'section',
        },
        {
            title: 'Days',
            dataIndex: 'days',
        },
        {
            title: 'Time',
            dataIndex: 'time',
        },
        {
            title: 'Enroll',
            render: (_, record) => (
                <Button onClick={() => confirm(record)}>Enroll</Button>
            ),
        },
    ];

    const meta = offeredCourseData.meta as TMeta;

    const tableData = offeredCourseData?.data?.map(
        ({
            _id,
            course,
            faculty,
            section,
            days,
            startTime,
            endTime,
        }: TOfferedCourse) => ({
            key: _id,
            course: course.title,
            faculty: faculty.fullName,
            section,
            days: days.join(', '),
            time: `${startTime} - ${endTime}`,
        }),
    );

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                My Offered Courses
            </h2>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
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
            {contextHolder}
        </>
    );
};

export default StudentOfferedCourse;
