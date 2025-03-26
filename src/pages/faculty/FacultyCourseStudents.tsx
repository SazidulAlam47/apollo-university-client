import { Button, Modal, Pagination, Table, TableColumnsType } from 'antd';
import { Key, useState } from 'react';
import { TEnrolledCourses, TMeta, TResponse } from '../../types';
import Loader from '../../components/loader/Loader';
import { useParams } from 'react-router-dom';
import {
    useGetFacultyEnrolledCoursesQuery,
    useUpdateMarksMutation,
} from '../../redux/features/faculty/facultyCourses.api';
import { useGetSingleOfferedCourseQuery } from '../../redux/features/admin/courseManagement/offeredCourse.api';
import UFrom from '../../components/form/UFrom';
import UInputNumber from '../../components/form/UInputNumber';
import { toast } from 'sonner';
import { FieldValues, SubmitHandler } from 'react-hook-form';

type TTableData = {
    key: Key;
    studentName: string;
    studentId: string;
    classTest1: number;
    midTerm: number;
    classTest2: number;
    finalTerm: number;
    grade: string;
    gradePoints: number;
    semesterRegistration: string;
    offeredCourse: string;
    student: string;
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
        render: (_, record) => <UpdateMarksModal studentInfo={record} />,
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
            semesterRegistration,
            offeredCourse,
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
            semesterRegistration,
            offeredCourse,
            student: student._id,
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

const UpdateMarksModal = ({ studentInfo }: { studentInfo: TTableData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateMarks] = useUpdateMarksMutation();

    const defaultValues = {
        classTest1: studentInfo.classTest1 || undefined,
        midTerm: studentInfo.midTerm || undefined,
        classTest2: studentInfo.classTest2 || undefined,
        finalTerm: studentInfo.finalTerm || undefined,
    };

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const formatMark = (mark: number | null | undefined) =>
            mark === null ? undefined : mark;

        const marksData = {
            semesterRegistration: studentInfo.semesterRegistration,
            offeredCourse: studentInfo.offeredCourse,
            student: studentInfo.student,
            courseMarks: {
                classTest1: formatMark(data.classTest1),
                midTerm: formatMark(data.midTerm),
                classTest2: formatMark(data.classTest2),
                finalTerm: formatMark(data.finalTerm),
            },
        };

        const toastId = toast.loading('Updating...');
        const res = (await updateMarks(marksData)) as TResponse<null>;
        if (res.data) {
            toast.success(res.data.message, { id: toastId });
            setIsModalOpen(false);
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>Update Marks</Button>
            <Modal
                title={`Update Marks for ${studentInfo.studentName}`}
                open={isModalOpen}
                footer={false}
                onCancel={handleCancel}
            >
                <UFrom onSubmit={handleSubmit} defaultValues={defaultValues}>
                    <UInputNumber
                        name="classTest1"
                        label="Class Test 1"
                        placeholder="Class Test 1 Marks"
                        min={0}
                        max={10}
                    />
                    <UInputNumber
                        name="midTerm"
                        label="Mid Term"
                        placeholder="Mid Term Marks"
                        min={0}
                        max={30}
                    />
                    <UInputNumber
                        name="classTest2"
                        label="Class Test 2"
                        placeholder="Class Test 2 Marks"
                        min={0}
                        max={10}
                    />
                    <UInputNumber
                        name="finalTerm"
                        label="Final Term"
                        placeholder="Final Term Marks"
                        min={0}
                        max={50}
                    />
                    <Button htmlType="submit">Update</Button>
                </UFrom>
            </Modal>
        </>
    );
};

export default FacultyCourseStudents;
