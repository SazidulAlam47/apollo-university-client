import { Button, Col, Flex } from 'antd';
import {
    useAddAcademicDepartmentMutation,
    useGetAllAcademicFacultiesQuery,
} from '../../../redux/features/admin/academicManagement/academicManagement.api';
import UFrom from '../../../components/form/UFrom';
import UInput from '../../../components/form/UInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicDepartmentSchema } from '../../../schemas/academicManagement.schema';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import {
    TAcademicDepartment,
    TAcademicFaculty,
    TResponse,
} from '../../../types';
import { useNavigate } from 'react-router-dom';
import USelect from '../../../components/form/USelect';

const CreateAcademicDepartment = () => {
    const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
    const navigate = useNavigate();
    const { data: academicFacultiesData, isLoading } =
        useGetAllAcademicFacultiesQuery(undefined);

    const academicFacultyOptions = academicFacultiesData?.data.map(
        (item: TAcademicFaculty) => ({
            value: item._id,
            label: item.name,
        }),
    );

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');
        const res = (await addAcademicDepartment(
            data,
        )) as TResponse<TAcademicDepartment>;
        if (res.data) {
            navigate('/admin/academic-department');
            toast.success(res.data.message, { id: toastId });
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Create Academic Department
            </h2>
            <Flex justify="center">
                <Col span={10}>
                    <UFrom
                        onSubmit={handleSubmit}
                        resolver={zodResolver(academicDepartmentSchema)}
                    >
                        <UInput
                            type="text"
                            name="name"
                            label="Name"
                            placeholder="Name"
                        />
                        <USelect
                            name="academicFaculty"
                            placeholder="Select Academic Faculty"
                            label="Academic Faculty"
                            options={academicFacultyOptions}
                            disabled={isLoading}
                        />
                        <Button htmlType="submit">Create</Button>
                    </UFrom>
                </Col>
            </Flex>
        </>
    );
};

export default CreateAcademicDepartment;
