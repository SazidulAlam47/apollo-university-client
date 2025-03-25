import { Button, Col, Flex } from 'antd';
import UFrom from '../../../components/form/UFrom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UInput from '../../../components/form/UInput';
import { toast } from 'sonner';
import {
    TAcademicDepartment,
    TAcademicFaculty,
    TCourse,
    TFaculty,
    TOfferedCourse,
    TResponse,
    TSemesterRegistration,
} from '../../../types';
import { useAddOfferedCourseMutation } from '../../../redux/features/admin/courseManagement/offeredCourse.api';
import { useGetAllSemesterRegistrationQuery } from '../../../redux/features/admin/courseManagement/courseManagement.api';
import USelect, { TUSelectFncRef } from '../../../components/form/USelect';
import {
    useGetAllAcademicDepartmentsQuery,
    useGetAllAcademicFacultiesQuery,
} from '../../../redux/features/admin/academicManagement/academicManagement.api';
import { useEffect, useRef, useState } from 'react';
import USelectWatch from '../../../components/form/USelectWatch';
import {
    useGetAllAssignedFacultiesQuery,
    useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagement/courses.api';
import UTimePicker from '../../../components/form/UTimePicker';
import { createOfferedCourseSchema } from '../../../schemas/courseManagement.schema';
import { daysOptions } from '../../../constants/global';

const CreateOfferedCourse = () => {
    const [academicFaculty, setAcademicFaculty] = useState('');
    const [course, setCourse] = useState('');
    const [addOfferedCourse] = useAddOfferedCourseMutation();
    const resetDeptRef = useRef<TUSelectFncRef>(undefined);
    const resetFacultyRef = useRef<TUSelectFncRef>(undefined);

    const { data: semesterRegistrationData, isFetching: isSemesterFetching } =
        useGetAllSemesterRegistrationQuery([
            { name: 'status', value: 'Upcoming' },
            { name: 'status', value: 'Ongoing' },
        ]);

    const semesterRegistrationOptions = semesterRegistrationData?.data.map(
        (item: TSemesterRegistration) => ({
            value: item._id,
            label: `${item.academicSemester.name} - ${item.academicSemester.year}`,
        }),
    );

    const {
        data: semesterFacultiesData,
        isFetching: isAcademicFacultiesFetching,
    } = useGetAllAcademicFacultiesQuery([]);

    const semesterFacultiesOptions = semesterFacultiesData?.data.map(
        (item: TAcademicFaculty) => ({
            value: item._id,
            label: item.name,
        }),
    );

    const {
        data: semesterDepartmentsData,
        isFetching: isAcademicDepartmentsFetching,
    } = useGetAllAcademicDepartmentsQuery(
        [{ name: 'academicFaculty', value: academicFaculty }],
        {
            skip: !academicFaculty,
        },
    );

    const semesterDepartmentsOptions = semesterDepartmentsData?.data.map(
        (item: TAcademicDepartment) => ({
            value: item._id,
            label: item.name,
        }),
    );

    const { data: coursesData, isFetching: isCourseFetching } =
        useGetAllCoursesQuery([]);

    const courseOption = coursesData?.data.map((item: TCourse) => ({
        value: item._id,
        label: item.title,
    }));

    const { data: courseFacultiesData, isFetching: isCourseFacultiesFetching } =
        useGetAllAssignedFacultiesQuery(course, { skip: !course });

    const facultiesOption = courseFacultiesData?.data?.faculties.map(
        (item: TFaculty) => ({
            value: item._id,
            label: item.fullName,
        }),
    );

    useEffect(() => {
        if (resetDeptRef.current) {
            resetDeptRef.current.resetField();
        }
    }, [academicFaculty]);

    useEffect(() => {
        if (resetFacultyRef.current) {
            resetFacultyRef.current.resetField();
        }
    }, [course]);

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const start = new Date(data.time[0]);
        const end = new Date(data.time[1]);
        const formatTime = (date: Date) =>
            `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        const offeredCourseData: {
            time?: [Date, Date];
            startTime: string;
            endTime: string;
        } = {
            ...data,
            startTime: formatTime(start),
            endTime: formatTime(end),
        };
        delete offeredCourseData.time;

        const toastId = toast.loading('Creating...');
        const res = (await addOfferedCourse(
            offeredCourseData,
        )) as TResponse<TOfferedCourse>;
        if (res.data) {
            toast.success(res.data.message, { id: toastId });
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Offer a Course
            </h2>
            <Flex justify="center">
                <Col span={10} style={{ marginBottom: 20 }}>
                    <UFrom
                        onSubmit={handleSubmit}
                        resolver={zodResolver(createOfferedCourseSchema)}
                        reset
                    >
                        <USelect
                            name="semesterRegistration"
                            label="Semester"
                            placeholder="Select Semester"
                            disabled={isSemesterFetching}
                            options={semesterRegistrationOptions}
                        />
                        <USelectWatch
                            name="academicFaculty"
                            label="Academic Faculty"
                            placeholder="Select Academic Faculty"
                            disabled={isAcademicFacultiesFetching}
                            options={semesterFacultiesOptions}
                            setSelectValue={setAcademicFaculty}
                        />
                        <USelect
                            name="academicDepartment"
                            label="Academic Department"
                            placeholder="Select Academic Department"
                            disabled={
                                isAcademicDepartmentsFetching ||
                                !academicFaculty
                            }
                            options={semesterDepartmentsOptions}
                            fncRef={resetDeptRef}
                        />
                        <USelectWatch
                            name="course"
                            label="Course"
                            placeholder="Select Course"
                            disabled={isCourseFetching}
                            options={courseOption}
                            setSelectValue={setCourse}
                        />
                        <USelect
                            name="faculty"
                            label="Faculty"
                            placeholder="Select Faculty"
                            disabled={isCourseFacultiesFetching || !course}
                            options={facultiesOption}
                            fncRef={resetFacultyRef}
                        />
                        <UInput
                            name="maxCapacity"
                            label="Maximum Capacity"
                            placeholder="Maximum Capacity"
                        />
                        <UInput
                            name="section"
                            label="Section"
                            placeholder="Section"
                        />
                        <USelect
                            mode="multiple"
                            name="days"
                            label="Days"
                            placeholder="Select Days"
                            options={daysOptions}
                        />
                        <UTimePicker
                            name="time"
                            label="Class Time"
                            placeholder={['Start Time', 'End Time']}
                        />
                        <Button htmlType="submit">Offer</Button>
                    </UFrom>
                </Col>
            </Flex>
        </>
    );
};

export default CreateOfferedCourse;
