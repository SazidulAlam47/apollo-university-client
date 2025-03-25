import { Button, Col, Flex } from 'antd';
import { useGetAllAcademicSemestersQuery } from '../../../redux/features/admin/academicManagement/academicManagement.api';
import UFrom from '../../../components/form/UFrom';
import UInput from '../../../components/form/UInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import {
    TAcademicSemester,
    TResponse,
    TSemesterRegistration,
} from '../../../types';
import { useNavigate } from 'react-router-dom';
import USelect from '../../../components/form/USelect';
import UDatePacker from '../../../components/form/UDatePacker';
import { semesterRegistrationSchema } from '../../../schemas/courseManagement.schema';
import { useAddSemesterRegistrationMutation } from '../../../redux/features/admin/courseManagement/courseManagement.api';

const SemesterRegistration = () => {
    const [addSemesterRegistration] = useAddSemesterRegistrationMutation();
    const navigate = useNavigate();

    const { data: academicSemestersData, isLoading } =
        useGetAllAcademicSemestersQuery([{ name: 'sort', value: 'year' }]);

    const academicSemesterOptions = academicSemestersData?.data.map(
        (item: TAcademicSemester) => ({
            value: item._id,
            label: `${item.name} - ${item.year}`,
        }),
    );

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const semesterData = {
            ...data,
        };

        const toastId = toast.loading('Creating...');
        const res = (await addSemesterRegistration(
            semesterData,
        )) as TResponse<TSemesterRegistration>;
        if (res.data) {
            navigate('/admin/registered-semesters');
            toast.success(res.data.message, { id: toastId });
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };
    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Register a Semester
            </h2>
            <Flex justify="center">
                <Col span={10}>
                    <UFrom
                        onSubmit={handleSubmit}
                        resolver={zodResolver(semesterRegistrationSchema)}
                        defaultValues={{ minCredit: '3', maxCredit: '16' }}
                    >
                        <USelect
                            name="academicSemester"
                            placeholder="Select Academic Semester"
                            label="Academic Semester"
                            options={academicSemesterOptions}
                            disabled={isLoading}
                        />
                        <UDatePacker
                            name="startDate"
                            placeholder="Select Start Date"
                            label="Start Date"
                        />
                        <UDatePacker
                            name="endDate"
                            placeholder="Select End Date"
                            label="End Date"
                        />
                        <UInput
                            name="minCredit"
                            label="Minimum Credit"
                            placeholder="Minimum Credit"
                        />
                        <UInput
                            name="maxCredit"
                            label="Maximum Credit"
                            placeholder="Maximum Credit"
                        />
                        <Button htmlType="submit">Register</Button>
                    </UFrom>
                </Col>
            </Flex>
        </>
    );
};

export default SemesterRegistration;
