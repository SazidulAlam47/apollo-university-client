import { Button, Col, Flex } from 'antd';
import UFrom from '../../../components/form/UFrom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import USelect from '../../../components/form/USelect';
import { nameOptions, yearOptions } from '../../../constants/semester';
import { monthsOptions } from '../../../constants/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';
import { useAddAcademicSemesterMutation } from '../../../redux/features/admin/academicManagement/academicManagement.api';
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
            <h2 style={{ textAlign: 'center', margin: '10px 0 24px 0' }}>
                Create Academic Semester
            </h2>
            <Flex
                justify="center"
                style={{
                    background: '#f5f6fa',
                    minHeight: '100vh',
                    padding: 16,
                }}
            >
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
                        <Button
                            htmlType="submit"
                            block
                            style={{ marginTop: 8, marginBottom: 8 }}
                        >
                            Create
                        </Button>
                    </UFrom>
                </Col>
            </Flex>
        </>
    );
};

export default CreateAcademicSemester;
