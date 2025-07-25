import { Button, Col, Flex } from 'antd';
import UFrom, { TUFromFncRef } from '../../../components/form/UFrom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UInput from '../../../components/form/UInput';
import { toast } from 'sonner';
import { TCourse, TResponse } from '../../../types';
import {
    useAddCourseMutation,
    useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagement/courses.api';
import USelect from '../../../components/form/USelect';
import { courseSchema } from '../../../schemas/courseManagement.schema';
import { useRef } from 'react';

const CreateCourse = () => {
    const fromResetRef = useRef<TUFromFncRef>(undefined);
    const { data: coursesData, isFetching } = useGetAllCoursesQuery([]);
    const [addCourse] = useAddCourseMutation();

    const preRequisiteCoursesOptions = coursesData?.data?.map(
        (course: TCourse) => ({
            value: course._id,
            label: course.title,
        }),
    );

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const courseData = {
            ...data,
            preRequisiteCourses: data?.preRequisiteCourses?.map(
                (item: string) => ({
                    course: item,
                    isDeleted: false,
                }),
            ),
        };
        const toastId = toast.loading('Creating...');
        const res = (await addCourse(courseData)) as TResponse<TCourse>;

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
                Create a Course
            </h2>
            <Flex justify="center">
                <Col
                    xs={{ span: 24 }}
                    sm={{ span: 18, offset: 3 }}
                    md={{ span: 12, offset: 6 }}
                    lg={{ span: 10, offset: 0 }}
                    xl={{ span: 10, offset: 0 }}
                >
                    <UFrom
                        onSubmit={handleSubmit}
                        resolver={zodResolver(courseSchema)}
                        fncRef={fromResetRef}
                    >
                        <UInput
                            name="title"
                            label="Course Title"
                            placeholder="Enter Course Title"
                        />
                        <UInput
                            name="prefix"
                            label="Course Prefix"
                            placeholder="Enter Course Prefix"
                        />
                        <UInput
                            name="code"
                            label="Course Code"
                            placeholder="Enter Course Code"
                        />
                        <UInput
                            name="credits"
                            label="Course Credits"
                            placeholder="Enter Course Credits"
                        />
                        <USelect
                            mode="multiple"
                            name="preRequisiteCourses"
                            label="Pre-requisite Courses"
                            placeholder="Enter Pre-requisite Courses"
                            disabled={isFetching}
                            options={preRequisiteCoursesOptions}
                        />
                        <Button htmlType="submit">Create</Button>
                    </UFrom>
                </Col>
            </Flex>
        </>
    );
};

export default CreateCourse;
