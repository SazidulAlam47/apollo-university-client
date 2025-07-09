import { Button, Pagination, Table, TableColumnsType } from 'antd';
import { Key, useState } from 'react';
import { TMeta, TOfferedCourse } from '../../types';
import Loader from '../../components/loader/Loader';
import { useGetFacultyOfferedCoursesQuery } from '../../redux/features/faculty/facultyCourses.api';
import { Link } from 'react-router-dom';

type TTableData = {
    key: Key;
    academicFaculty: string;
    academicDepartment: string;
    course: string;
    section: number;
    days: string;
    time: string;
};

const columns: TableColumnsType<TTableData> = [
    {
        title: 'Academic Faculty',
        dataIndex: 'academicFaculty',
    },
    {
        title: 'Academic Department',
        dataIndex: 'academicDepartment',
    },
    {
        title: 'Course Title',
        dataIndex: 'course',
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
        title: 'Action',
        width: '5%',
        render: (_, { key }) => (
            <Link to={`/faculty/courses/${key}`}>
                <Button>Students</Button>
            </Link>
        ),
    },
];

const FacultyOfferedCourses = () => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const {
        data: facultyOfferedCourseData,
        isFetching,
        isLoading,
    } = useGetFacultyOfferedCoursesQuery([
        { name: 'page', value: page },
        { name: 'limit', value: limit },
    ]);

    if (isLoading) {
        return <Loader />;
    }

    const meta = facultyOfferedCourseData.meta as TMeta;

    const tableData = facultyOfferedCourseData?.data?.map(
        ({
            _id,
            academicFaculty,
            academicDepartment,
            course,
            section,
            days,
            startTime,
            endTime,
        }: TOfferedCourse) => ({
            key: _id,
            academicFaculty: academicFaculty.name,
            academicDepartment: academicDepartment.name,
            course: course.title,
            section,
            days: days.join(', '),
            time: `${startTime} - ${endTime}`,
        }),
    );

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                My Courses
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

export default FacultyOfferedCourses;
