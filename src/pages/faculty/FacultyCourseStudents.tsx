import { Button, Pagination, Table, TableColumnsType } from 'antd';
import { Key, useState } from 'react';
import { TEnrolledCourses, TMeta } from '../../types';
import Loader from '../../components/loader/Loader';
import { useParams } from 'react-router-dom';
import { useGetFacultyEnrolledCoursesQuery } from '../../redux/features/faculty/facultyCourses.api';
import { useGetSingleOfferedCourseQuery } from '../../redux/features/admin/courseManagement/offeredCourse.api';

type TTableData = {
    key: Key;
    name: string;
};

const columns: TableColumnsType<TTableData> = [
    {
        title: 'Student Name',
        dataIndex: 'studentName',
    },
    {
        title: 'Student ID',
        dataIndex: 'studentId',
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
    {
        title: 'Action',
        width: '5%',
        render: () => <Button>Update Marks</Button>,
    },
];

const FacultyCourseStudents = () => {
    const { offeredCourseId } = useParams();
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);

    const {
        data: enrolledCoursesData,
        isFetching,
        isLoading: isEnrolledCoursesLoading,
    } = useGetFacultyEnrolledCoursesQuery([
        { name: 'page', value: page },
        { name: 'limit', value: limit },
        { name: 'offeredCourse', value: offeredCourseId as string },
    ]);

    const { data: offeredCourseData, isLoading: isOfferedCourseLoading } =
        useGetSingleOfferedCourseQuery(offeredCourseId as string);

    if (isEnrolledCoursesLoading || isOfferedCourseLoading) {
        return <Loader />;
    }

    const meta = enrolledCoursesData.meta as TMeta;

    const tableData = enrolledCoursesData?.data?.map(
        ({
            _id,
            student,
            courseMarks,
            grade,
            gradePoints,
        }: TEnrolledCourses) => ({
            key: _id,
            studentName: student.fullName,
            studentId: student.id,
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
                {offeredCourseData?.data?.course?.title} - Students
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

export default FacultyCourseStudents;
