import { Button, Col, Flex } from 'antd';
import UFrom from '../../../components/form/UFrom';

import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useAddAcademicFacultyMutation } from '../../../redux/features/admin/academicManagement/academicManagement.api';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicFacultySchema } from '../../../schemas/academicManagement.schema';
import UInput from '../../../components/form/UInput';
import { toast } from 'sonner';
import { TAcademicFaculty, TResponse } from '../../../types';

const CreateAcademicFaculty = () => {
    const [addAcademicFaculty] = useAddAcademicFacultyMutation();
    const navigate = useNavigate();

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');
        const res = (await addAcademicFaculty(
            data,
        )) as TResponse<TAcademicFaculty>;

        if (res.data) {
            navigate('/admin/academic-faculty');
            toast.success(res.data.message, { id: toastId });
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0 24px 0' }}>
                Create Academic Faculty
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
                        resolver={zodResolver(academicFacultySchema)}
                    >
                        <UInput
                            type="text"
                            name="name"
                            label="Name"
                            placeholder="Name"
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

export default CreateAcademicFaculty;
