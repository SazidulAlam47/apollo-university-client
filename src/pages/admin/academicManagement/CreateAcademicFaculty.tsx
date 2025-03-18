import { Button, Col, Flex } from 'antd';
import UFrom from '../../../components/form/UFrom';

import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useAddAcademicFacultyMutation } from '../../../redux/features/admin/academicManagement/academicManagementApi';
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
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Create Academic Faculty
            </h2>
            <Flex justify="center">
                <Col span={10}>
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
                        <Button htmlType="submit">Create</Button>
                    </UFrom>
                </Col>
            </Flex>
        </>
    );
};

export default CreateAcademicFaculty;
