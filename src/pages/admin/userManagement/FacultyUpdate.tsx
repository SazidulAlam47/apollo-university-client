import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllAcademicDepartmentsQuery } from '../../../redux/features/admin/academicManagement/academicManagement.api';
import {
    useGetSingleFacultyQuery,
    useUpdateFacultyMutation,
} from '../../../redux/features/admin/userManagement/facultyManagement.api';
import { TAcademicDepartment, TResponse, TFaculty } from '../../../types';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Col, Divider, Row } from 'antd';
import UFrom from '../../../components/form/UFrom';
import UInput from '../../../components/form/UInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { facultySchema } from '../../../schemas/userManagement.schema';
import USelect from '../../../components/form/USelect';
import {
    bloodGroupOptions,
    genderOptions,
} from '../../../constants/userManagement.constant';
import UDatePacker from '../../../components/form/UDatePacker';
import UTextArea from '../../../components/form/UTextArea';
import UPictureInput from '../../../components/form/UPictureInput';
import Loader from '../../../components/loader/Loader';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const FacultyUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: facultyData, isLoading: isFacultyLoading } =
        useGetSingleFacultyQuery(id as string);

    const {
        data: academicDepartmentData,
        isLoading: isAcademicDepartmentLoading,
    } = useGetAllAcademicDepartmentsQuery([]);

    const [updateFaculty] = useUpdateFacultyMutation();

    if (isFacultyLoading || isAcademicDepartmentLoading) {
        return <Loader />;
    }

    const academicDepartmentOptions = academicDepartmentData?.data?.map(
        ({ _id, name }: TAcademicDepartment) => ({
            value: _id,
            label: name,
        }),
    );

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const facultyData = {
            faculty: data,
        };

        const formData = new FormData();
        if (data?.image?.name) {
            formData.append('file', data.image);
        }
        delete data?.image;
        formData.append('data', JSON.stringify(facultyData));

        // console.log(facultyData);

        // console.log(Object.fromEntries(formData));

        const toastId = toast.loading('Updating...');
        const res = (await updateFaculty({
            data: formData,
            id: id as string,
        })) as TResponse<TFaculty>;
        if (res.data) {
            toast.success(res.data.message, { id: toastId });
            navigate(`/admin/faculties-data/${id}`);
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    const faculty = facultyData.data as TFaculty;

    const defaultFacultyValues = {
        ...faculty,
        dateOfBirth: dayjs(faculty.dateOfBirth, 'YYYY-MM-DD'),
        academicDepartment: faculty.academicDepartment._id,
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Update Faculty Account
            </h2>
            <Row style={{ marginBottom: '2rem' }}>
                <Col span={24}>
                    <UFrom
                        onSubmit={handleSubmit}
                        resolver={zodResolver(facultySchema)}
                        defaultValues={defaultFacultyValues}
                    >
                        <Divider>Personal Info</Divider>
                        <Row gutter={10}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="name.firstName"
                                    label="First Name"
                                    placeholder="First Name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="name.middleName"
                                    label="Middle Name"
                                    placeholder="Middle Name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="name.lastName"
                                    label="Last Name"
                                    placeholder="Last Name"
                                />
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <USelect
                                    name="gender"
                                    label="Gender"
                                    placeholder="Gender"
                                    options={genderOptions}
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UDatePacker
                                    name="dateOfBirth"
                                    label="Date Of Birth"
                                    placeholder="Date Of Birth"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <USelect
                                    name="bloodGroup"
                                    label="Blood Group"
                                    placeholder="Blood Group"
                                    options={bloodGroupOptions}
                                />
                            </Col>
                        </Row>
                        <Divider>Contact Info</Divider>
                        <Row gutter={10}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                <UInput
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                <UInput
                                    name="contactNumber"
                                    label="Contact Number"
                                    placeholder="Contact Number"
                                />
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                <UTextArea
                                    name="presentAddress"
                                    label="Present Address"
                                    placeholder="Present Address"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                <UTextArea
                                    name="permanentAddress"
                                    label="Permanent Address"
                                    placeholder="Permanent Address"
                                />
                            </Col>
                        </Row>
                        <Divider>Academic Info</Divider>
                        <Row gutter={10}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                <USelect
                                    name="academicDepartment"
                                    label="Academic Department"
                                    placeholder="Academic Department"
                                    options={academicDepartmentOptions}
                                    disabled={isAcademicDepartmentLoading}
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                <UInput
                                    name="designation"
                                    label="Designation"
                                    placeholder="Designation"
                                />
                            </Col>
                        </Row>
                        <Divider>Picture</Divider>
                        <Row gutter={10}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                <UPictureInput />
                            </Col>
                        </Row>
                        <Button
                            htmlType="submit"
                            style={{ marginTop: '0.8rem' }}
                        >
                            Update
                        </Button>
                    </UFrom>
                </Col>
            </Row>
        </>
    );
};

export default FacultyUpdate;
