import { Pagination, Table, TableColumnsType } from 'antd';
import { Key, useState } from 'react';
import Loader from '../../components/loader/Loader';
import { TEnrolledCourses, TMeta } from '../../types';
import { useGetStudentEnrolledCoursesQuery } from '../../redux/features/student/studentCourse.api';

type TTableData = {
    key: Key;
    course: string;
    section: number;
    faculty: string;
    days: string;
    time: string;
    classTest1: number;
    midTerm: number;
    classTest2: number;
    finalTerm: number;
    grade: string;
    gradePoints: number;
};

const columns: TableColumnsType<TTableData> = [
    {
        title: 'Course',
        dataIndex: 'course',
    },
    {
        title: 'Section',
        dataIndex: 'section',
    },
    {
        title: 'Teacher',
        dataIndex: 'faculty',
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
        title: 'Class Test 1',
        dataIndex: 'classTest1',
    },
    {
        title: 'Mid Term',
        dataIndex: 'midTerm',
    },
    {
        title: 'Class Test 2',
        dataIndex: 'classTest2',
    },
    {
        title: 'Final Term',
        dataIndex: 'finalTerm',
    },
    {
        title: 'Grade',
        dataIndex: 'grade',
    },
    {
        title: 'Grade Points',
        dataIndex: 'gradePoints',
    },
];

const StudentEnrolledCourses = () => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const {
        data: enrolledCourseData,
        isFetching,
        isLoading,
    } = useGetStudentEnrolledCoursesQuery([
        { name: 'page', value: page },
        { name: 'limit', value: limit },
    ]);

    if (isLoading) {
        return <Loader />;
    }

    const meta = enrolledCourseData.meta as TMeta;

    const tableData = enrolledCourseData?.data?.map(
        ({
            _id,
            course,
            offeredCourse,
            faculty,
            courseMarks,
            grade,
            gradePoints,
        }: TEnrolledCourses) => ({
            key: _id,
            course: course.title,
            section: offeredCourse.section,
            faculty: faculty.fullName,
            days: offeredCourse.days.join(', '),
            time: `${offeredCourse.startTime} - ${offeredCourse.endTime}`,
            classTest1: courseMarks.classTest1,
            midTerm: courseMarks.midTerm,
            classTest2: courseMarks.classTest2,
            finalTerm: courseMarks.finalTerm,
            grade,
            gradePoints,
        }),
    );

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                My Enrolled Courses
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

export default StudentEnrolledCourses;
