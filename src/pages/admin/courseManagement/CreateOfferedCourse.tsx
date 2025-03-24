import { Button, Col, Flex } from 'antd';
import UFrom from '../../../components/form/UFrom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicFacultySchema } from '../../../schemas/academicManagement.schema';
import UInput from '../../../components/form/UInput';
import { toast } from 'sonner';
import {
    TAcademicDepartment,
    TAcademicFaculty,
    TResponse,
    TSemesterRegistration,
} from '../../../types';
import { useAddOfferedCourseMutation } from '../../../redux/features/admin/courseManagement/offeredCourse.api';
import { useGetAllSemesterRegistrationQuery } from '../../../redux/features/admin/courseManagement/semesterRegistration.api';
import USelect, { TUSelectFncRef } from '../../../components/form/USelect';
import {
    useGetAllAcademicDepartmentsQuery,
    useGetAllAcademicFacultiesQuery,
} from '../../../redux/features/admin/academicManagement/academicManagement.api';
import { useEffect, useRef, useState } from 'react';
import USelectWatch from '../../../components/form/USelectWatch';

const CreateOfferedCourse = () => {
    const [academicFaculty, setAcademicFaculty] = useState('');
    const [addOfferedCourse] = useAddOfferedCourseMutation();
    const resetDeptRef = useRef<TUSelectFncRef>(undefined);

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

    useEffect(() => {
        if (resetDeptRef.current) {
            resetDeptRef.current.resetField();
        }
    }, [academicFaculty]);

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        // const toastId = toast.loading('Creating...');
        // const res = (await addOfferedCourse(
        //     data,
        // )) as TResponse<T>;
        // if (res.data) {
        //     toast.success(res.data.message, { id: toastId });
        // } else if (res.error) {
        //     toast.error(res.error.data.message, { id: toastId });
        // }
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Offer a Course
            </h2>
            <Flex justify="center">
                <Col span={10}>
                    <UFrom
                        onSubmit={handleSubmit}
                        // resolver={zodResolver()}
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
                        <Button htmlType="submit">Create</Button>
                    </UFrom>
                </Col>
            </Flex>
        </>
    );
};

export default CreateOfferedCourse;
