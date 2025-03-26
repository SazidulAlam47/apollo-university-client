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
        dataIndex: 'academicFacultyName',
    },
    {
        title: 'Academic Department',
        dataIndex: 'academicDepartmentName',
    },
    {
        title: 'Course Title',
        dataIndex: 'courseTitle',
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
            semesterRegistration,
            academicFaculty,
            academicDepartment,
            course,
            section,
            days,
            startTime,
            endTime,
        }: TOfferedCourse) => ({
            key: _id,
            academicFacultyName: academicFaculty.name,
            academicDepartmentName: academicDepartment.name,
            courseTitle: course.title,
            section,
            days: days.join(', '),
            time: `${startTime} - ${endTime}`,
            semesterRegistration,
            academicDepartment,
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
