import { Button, Col, Flex } from 'antd';
import UFrom from '../../../components/form/UFrom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UInput from '../../../components/form/UInput';
import { toast } from 'sonner';
import { TDay, TFaculty, TOfferedCourse, TResponse } from '../../../types';
import {
    useGetSingleOfferedCourseQuery,
    useUpdateOfferedCourseMutation,
} from '../../../redux/features/admin/courseManagement/offeredCourse.api';
import USelect from '../../../components/form/USelect';
import { useGetAllAssignedFacultiesQuery } from '../../../redux/features/admin/courseManagement/courses.api';
import UTimePicker from '../../../components/form/UTimePicker';
import { updateOfferedCourseSchema } from '../../../schemas/courseManagement.schema';
import { daysOptions } from '../../../constants/global';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Loader from '../../../components/loader/Loader';

const OfferedCourseUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: offeredCourseData, isLoading: isOfferedCourseLoading } =
        useGetSingleOfferedCourseQuery(id as string);
    const offeredCourse = offeredCourseData?.data as TOfferedCourse;

    const { data: courseFacultiesData, isLoading: isCourseFacultiesLoading } =
        useGetAllAssignedFacultiesQuery(offeredCourse?.course?._id, {
            skip: isOfferedCourseLoading,
        });

    const [updateOfferedCourse] = useUpdateOfferedCourseMutation();

    if (isOfferedCourseLoading || isCourseFacultiesLoading) {
        return <Loader />;
    }

    const facultiesOption = courseFacultiesData?.data?.faculties.map(
        (item: TFaculty) => ({
            value: item._id,
            label: item.fullName,
        }),
    );

    const startTime = dayjs(offeredCourse.startTime, 'HH:mm');
    const endTime = dayjs(offeredCourse.endTime, 'HH:mm');

    const defaultValues = {
        faculty: offeredCourse.faculty._id,
        maxCapacity: offeredCourse.maxCapacity,
        days: offeredCourse.days,
        time: [startTime, endTime],
    };

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const start = new Date(data.time[0]);
        const end = new Date(data.time[1]);
        const formatTime = (date: Date) =>
            `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        const offeredCourseUpdatedData: {
            faculty?: string;
            maxCapacity?: number;
            days?: TDay[];
            time?: [Date, Date];
            startTime?: string;
            endTime?: string;
        } = {
            faculty: data.faculty,
            maxCapacity: data.maxCapacity,
            days: data.days,
            startTime: formatTime(start),
            endTime: formatTime(end),
        };
        delete offeredCourseUpdatedData.time;

        const toastId = toast.loading('Updating...');
        const res = (await updateOfferedCourse({
            data: offeredCourseUpdatedData,
            id,
        })) as TResponse<TOfferedCourse>;
        if (res.data) {
            toast.success(res.data.message, { id: toastId });
            navigate('/admin/offered-courses');
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Updated a Offered Course
            </h2>
            <Flex justify="center">
                <Col
                    xs={{ span: 24 }}
                    sm={{ span: 18, offset: 3 }}
                    md={{ span: 12, offset: 6 }}
                    lg={{ span: 10, offset: 0 }}
                    xl={{ span: 10, offset: 0 }}
                    style={{
                        maxWidth: 400,
                        width: '100%',
                        margin: '0 auto',
                    }}
                >
                    <UFrom
                        onSubmit={handleSubmit}
                        defaultValues={defaultValues}
                        resolver={zodResolver(updateOfferedCourseSchema)}
                    >
                        <USelect
                            name="faculty"
                            label="Faculty"
                            placeholder="Select Faculty"
                            disabled={isCourseFacultiesLoading}
                            options={facultiesOption}
                        />
                        <UInput
                            name="maxCapacity"
                            label="Maximum Capacity"
                            placeholder="Maximum Capacity"
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
                        <Button htmlType="submit">Update</Button>
                    </UFrom>
                </Col>
            </Flex>
        </>
    );
};

export default OfferedCourseUpdate;
