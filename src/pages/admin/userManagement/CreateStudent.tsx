import { Button, Col, Divider, Row } from 'antd';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import UFrom from '../../../components/form/UFrom';
import UInput from '../../../components/form/UInput';
import USelect from '../../../components/form/USelect';
import {
    bloodGroupOptions,
    genderOptions,
} from '../../../constants/userManagement.constant';
import UTextArea from '../../../components/form/UTextArea';
import {
    useGetAllAcademicDepartmentsQuery,
    useGetAllAcademicSemestersQuery,
} from '../../../redux/features/admin/academicManagement/academicManagement.api';
import {
    TAcademicDepartment,
    TAcademicSemester,
    TResponse,
    TStudent,
} from '../../../types';
import UDatePacker from '../../../components/form/UDatePacker';
import { useAddStudentMutation } from '../../../redux/features/admin/userManagement/userManagement.api';
import { toast } from 'sonner';
import UPictureInput from '../../../components/form/UPictureInput';
import UInputPassword from '../../../components/form/UInputPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStudentSchema } from '../../../schemas/userManagement.schema';

const studentDummyData = {
    name: {
        firstName: 'Noah',
        middleName: 'M.',
        lastName: 'Taylor',
    },
    gender: 'Male',

    email: 'something@any.com',
    contactNumber: '456456456456',

    bloodGroup: 'O-',

    emergencyContact: '+8801884455667',
    presentAddress: '951 Willow Lane, Narayanganj, Bangladesh',
    permanentAddress: '753 Redwood Road, Barishal, Bangladesh',

    guardian: {
        fatherName: 'James Taylor',
        fatherOccupation: 'Scientist',
        fatherContact: '+8801556677881',
        motherName: 'Charlotte Taylor',
        motherOccupation: 'Writer',
        motherContact: '+8801445566772',
    },

    localGuardian: {
        name: 'Benjamin Carter',
        occupation: 'Architect',
        contactNo: '+8801223344556',
        address: '369 Local Guardian Lane, Comilla, Bangladesh',
    },

    academicDepartment: '679ba9e7aae8ecca99ffb394',
    admissionSemester: '679f72de210d8e79bcda1434',
};

const CreateStudent = () => {
    const {
        data: academicDepartmentData,
        isLoading: isAcademicDepartmentLoading,
    } = useGetAllAcademicDepartmentsQuery([]);

    const { data: academicSemesterData, isLoading: isAcademicSemesterLoading } =
        useGetAllAcademicSemestersQuery([]);

    const [addStudent] = useAddStudentMutation();

    const academicDepartmentOptions = academicDepartmentData?.data?.map(
        ({ _id, name }: TAcademicDepartment) => ({
            value: _id,
            label: name,
        }),
    );

    const academicSemesterOptions = academicSemesterData?.data?.map(
        ({ _id, name, year }: TAcademicSemester) => ({
            value: _id,
            label: `${name} - ${year}`,
        }),
    );

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const studentData: {
            student: object;
            password?: string;
        } = {
            student: data,
        };

        if (data?.password) {
            studentData.password = data.password;
        }

        delete data?.password;

        const formData = new FormData();
        if (data?.image?.name) {
            formData.append('file', data.image);
        }
        delete data?.image;
        formData.append('data', JSON.stringify(studentData));

        // console.log(Object.fromEntries(formData));

        const toastId = toast.loading('Creating...');
        const res = (await addStudent(formData)) as TResponse<TStudent>;
        if (res.data) {
            toast.success(res.data.message, { id: toastId });
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Create New Student Account
            </h2>
            <Row style={{ marginBottom: '2rem' }}>
                <Col span={24}>
                    <UFrom
                        onSubmit={handleSubmit}
                        resolver={zodResolver(createStudentSchema)}
                        defaultValues={studentDummyData} //TODO: only for development
                        reset
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
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="contactNumber"
                                    label="Contact Number"
                                    placeholder="Contact Number"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="emergencyContact"
                                    label="Emergency Contact Number"
                                    placeholder="Emergency Contact Number"
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
                        <Divider>Guardian Info</Divider>
                        <Row gutter={10}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="guardian.fatherName"
                                    label="Father Name"
                                    placeholder="Father Name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="guardian.fatherOccupation"
                                    label="Father Occupation"
                                    placeholder="Father Occupation"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="guardian.fatherContact"
                                    label="Father Contact Number"
                                    placeholder="Father Contact Number"
                                />
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="guardian.motherName"
                                    label="Mother Name"
                                    placeholder="Mother Name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="guardian.motherOccupation"
                                    label="Mother Occupation"
                                    placeholder="Mother Occupation"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="guardian.motherContact"
                                    label="Mother Contact Number"
                                    placeholder="Mother Contact Number"
                                />
                            </Col>
                        </Row>
                        <Divider>Local Guardian Info</Divider>
                        <Row gutter={10}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="localGuardian.name"
                                    label="Name"
                                    placeholder="Name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="localGuardian.occupation"
                                    label="Occupation"
                                    placeholder="Occupation"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <UInput
                                    name="localGuardian.contactNo"
                                    label="Contact Number"
                                    placeholder="Contact Number"
                                />
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={24}>
                                <UTextArea
                                    name="localGuardian.address"
                                    label="Address"
                                    placeholder="Address"
                                    row={2}
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
                                <USelect
                                    name="admissionSemester"
                                    label="Admission Semester"
                                    placeholder="Admission Semester"
                                    options={academicSemesterOptions}
                                    disabled={isAcademicSemesterLoading}
                                />
                            </Col>
                        </Row>
                        <Divider>Picture And Password (Optional)</Divider>
                        <Row gutter={10}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                <UPictureInput />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                <UInputPassword showLabel />
                            </Col>
                        </Row>
                        <Button
                            htmlType="submit"
                            style={{ marginTop: '0.8rem' }}
                        >
                            Create
                        </Button>
                    </UFrom>
                </Col>
            </Row>
        </>
    );
};

export default CreateStudent;
