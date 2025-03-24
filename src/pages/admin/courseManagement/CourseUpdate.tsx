import { Button, Col, Flex } from 'antd';
import UFrom from '../../../components/form/UFrom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UInput from '../../../components/form/UInput';
import { toast } from 'sonner';
import { TCourse, TPreRequisiteCourse, TResponse } from '../../../types';
import {
    useGetAllCoursesQuery,
    useGetSingleCourseQuery,
    useUpdateCourseMutation,
} from '../../../redux/features/admin/courseManagement/courses.api';
import USelect from '../../../components/form/USelect';
import { courseSchema } from '../../../schemas/courseManagement.schema';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';

const CourseUpdate = () => {
    const { id } = useParams();
    const { data: singleCourseData, isLoading } = useGetSingleCourseQuery(
        id as string,
    );

    const { data: coursesData, isFetching } = useGetAllCoursesQuery([]);
    const [updateCourse] = useUpdateCourseMutation();

    if (isLoading) {
        return <Loader />;
    }

    const preRequisiteCoursesOptions = coursesData?.data?.map(
        (course: TCourse) => ({
            value: course._id,
            label: course.title,
        }),
    );

    const defaultValues = {
        ...singleCourseData.data,
        preRequisiteCourses: singleCourseData.data?.preRequisiteCourses.map(
            (item: TPreRequisiteCourse) => item.course._id,
        ),
    };

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const courseData: {
            preRequisiteCourses: { course: string; isDeleted: boolean }[];
        } = {
            ...data,
            preRequisiteCourses: [],
        };
        let oldCoursesIds = defaultValues.preRequisiteCourses;
        const newCoursesIds = data.preRequisiteCourses;

        oldCoursesIds = oldCoursesIds.filter((id: string) => {
            const check = newCoursesIds.find((newId: string) => newId === id);
            if (check) return false;
            else return true;
        });

        oldCoursesIds.forEach((id: string) => {
            courseData.preRequisiteCourses.push({
                course: id,
                isDeleted: true,
            });
        });

        newCoursesIds.forEach((id: string) => {
            courseData.preRequisiteCourses.push({
                course: id,
                isDeleted: false,
            });
        });

        const toastId = toast.loading('Updating...');
        const res = (await updateCourse({
            data: courseData,
            id,
        })) as TResponse<TCourse>;

        if (res.data) {
            toast.success(res.data.message, { id: toastId });
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Update a Course
            </h2>
            <Flex justify="center">
                <Col span={10}>
                    <UFrom
                        onSubmit={handleSubmit}
                        resolver={zodResolver(courseSchema)}
                        defaultValues={defaultValues}
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

export default CourseUpdate;
