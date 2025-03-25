/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from 'antd';
import UFrom, { TUFromFncRef } from '../../../components/form/UFrom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { TCourse, TFaculty, TResponse } from '../../../types';
import {
    useAssignCourseFacultiesMutation,
    useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagement/courses.api';
import USelect from '../../../components/form/USelect';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement/facultyManagement.api';
import { assignCourseFacultiesSchema } from '../../../schemas/courseManagement.schema';
import { useRef } from 'react';

const AssignCourseFaculties = () => {
    const fromResetRef = useRef<TUFromFncRef>(undefined);
    const { data: coursesData, isFetching: isCourseFetching } =
        useGetAllCoursesQuery([]);

    const courseOption = coursesData?.data.map((item: TCourse) => ({
        value: item._id,
        label: item.title,
    }));

    const { data: facultiesData, isFetching: isFacultiesFetching } =
        useGetAllFacultiesQuery([]);

    const facultiesOption = facultiesData?.data.map((item: TFaculty) => ({
        value: item._id,
        label: item.fullName,
    }));

    const [assignCourseFaculties] = useAssignCourseFacultiesMutation();

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const courseFacultiesData = {
            courseId: data.course,
            data: {
                faculties: data.faculties,
            },
        };

        const toastId = toast.loading('Assigning...');
        const res = (await assignCourseFaculties(
            courseFacultiesData,
        )) as TResponse<any>;
        if (res.data) {
            toast.success(res.data.message, { id: toastId });
            fromResetRef?.current?.resetFrom();
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };
    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Assign Course Faculties
            </h2>
            <Flex justify="center">
                <Col span={10}>
                    <UFrom
                        onSubmit={handleSubmit}
                        resolver={zodResolver(assignCourseFacultiesSchema)}
                        fncRef={fromResetRef}
                    >
                        <USelect
                            name="course"
                            label="Course"
                            placeholder="Select Course"
                            disabled={isCourseFetching}
                            options={courseOption}
                        />
                        <USelect
                            mode="multiple"
                            name="faculties"
                            label="Faculties"
                            placeholder="Select Faculties"
                            disabled={isFacultiesFetching}
                            options={facultiesOption}
                        />
                        <Button htmlType="submit">Assign</Button>
                    </UFrom>
                </Col>
            </Flex>
        </>
    );
};

export default AssignCourseFaculties;
