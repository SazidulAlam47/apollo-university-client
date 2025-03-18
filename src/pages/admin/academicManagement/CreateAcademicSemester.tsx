import { Button, Col, Flex } from 'antd';
import UFrom from '../../../components/form/UFrom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import USelect from '../../../components/form/USelect';
import { nameOptions, yearOptions } from '../../../constants/semester';
import { monthsOptions } from '../../../constants/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';
import { useAddAcademicSemesterMutation } from '../../../redux/features/admin/academicManagement/academicManagementApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { TAcademicSemester, TResponse } from '../../../types';

const CreateAcademicSemester = () => {
    const [addAcademicSemester] = useAddAcademicSemesterMutation();
    const navigate = useNavigate();

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const name = nameOptions[Number(data.name) - 1]?.label;
        const semesterData = {
            ...data,
            name,
            code: data.name,
        };
        const toastId = toast.loading('Creating...');
        const res = (await addAcademicSemester(
            semesterData,
        )) as TResponse<TAcademicSemester>;
        if (res.data) {
            navigate('/admin/academic-semester');
            toast.success(res.data.message, { id: toastId });
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Create Academic Semester
            </h2>
            <Flex justify="center">
                <Col span={10}>
                    <UFrom
                        onSubmit={handleSubmit}
                        resolver={zodResolver(academicSemesterSchema)}
                    >
                        <USelect
                            name="name"
                            placeholder="Select Name"
                            label="Name"
                            options={nameOptions}
                        />
                        <USelect
                            name="year"
                            placeholder="Select Year"
                            label="Year"
                            options={yearOptions}
                        />
                        <USelect
                            name="startMonth"
                            placeholder="Select Start Month"
                            label="Start Month"
                            options={monthsOptions}
                        />
                        <USelect
                            name="endMonth"
                            placeholder="Select End Month"
                            label="End Month"
                            options={monthsOptions}
                        />
                        <Button htmlType="submit">Create</Button>
                    </UFrom>
                </Col>
            </Flex>
        </>
    );
};

export default CreateAcademicSemester;
