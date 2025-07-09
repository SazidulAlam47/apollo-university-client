import { Button, Pagination, Table, TableColumnsType } from 'antd';
import { Key, useState } from 'react';
import { TMeta, TOfferedCourse } from '../../../types';
import Loader from '../../../components/loader/Loader';
import { useGetAllOfferedCoursesQuery } from '../../../redux/features/admin/courseManagement/offeredCourse.api';
import { Link } from 'react-router-dom';

type TTableData = {
    key: Key;
    name: string;
};

const columns: TableColumnsType<TTableData> = [
    {
        title: 'Academic Semester',
        dataIndex: 'academicSemester',
    },
    {
        title: 'Academic Department',
        dataIndex: 'academicDepartment',
    },
    {
        title: 'Course',
        dataIndex: 'course',
    },
    {
        title: 'Faculty',
        dataIndex: 'faculty',
    },
    {
        title: 'Days',
        dataIndex: 'days',
    },
    {
        title: 'Section',
        dataIndex: 'section',
    },
    {
        title: 'Start Time',
        dataIndex: 'startTime',
    },
    {
        title: 'End Time',
        dataIndex: 'endTime',
    },
    {
        title: 'Action',
        render: (_, { key }) => (
            <Link to={`/admin/offered-course-update/${key}`}>
                <Button>Update</Button>
            </Link>
        ),
    },
];

const OfferedCourseData = () => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const {
        data: offeredCoursesData,
        isFetching,
        isLoading,
    } = useGetAllOfferedCoursesQuery([
        { name: 'page', value: page },
        { name: 'limit', value: limit },
    ]);

    if (isLoading) {
        return <Loader />;
    }

    const meta = offeredCoursesData.meta as TMeta;

    const tableData = offeredCoursesData?.data?.map(
        ({
            _id,
            academicSemester,
            academicDepartment,
            course,
            faculty,
            days,
            section,
            startTime,
            endTime,
        }: TOfferedCourse) => ({
            key: _id,
            academicSemester: `${academicSemester?.name} - ${academicSemester?.year}`,
            academicDepartment: academicDepartment?.name,
            course: course?.title,
            faculty: faculty?.fullName,
            days: days?.join(', '),
            section,
            startTime,
            endTime,
        }),
    );

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Offered Courses
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
        </>
    );
};

export default OfferedCourseData;
