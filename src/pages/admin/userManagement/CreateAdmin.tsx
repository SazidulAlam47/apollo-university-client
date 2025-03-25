import { Button, Col, Divider, Row } from 'antd';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import UFrom, { TUFromFncRef } from '../../../components/form/UFrom';
import UInput from '../../../components/form/UInput';
import USelect from '../../../components/form/USelect';
import {
    bloodGroupOptions,
    genderOptions,
} from '../../../constants/userManagement.constant';
import UTextArea from '../../../components/form/UTextArea';
import { TAdmin, TResponse } from '../../../types';
import UDatePacker from '../../../components/form/UDatePacker';
import { toast } from 'sonner';
import UPictureInput from '../../../components/form/UPictureInput';
import UInputPassword from '../../../components/form/UInputPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddAdminMutation } from '../../../redux/features/admin/userManagement/adminManagement';
import { adminSchema } from '../../../schemas/userManagement.schema';
import { useRef } from 'react';

const CreateAdmin = () => {
    const fromResetRef = useRef<TUFromFncRef>(undefined);
    const [addAdmin] = useAddAdminMutation();

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const adminData: {
            admin: object;
            password?: string;
        } = {
            admin: data,
        };

        if (data?.password) {
            adminData.password = data.password;
        }

        delete data?.password;

        const formData = new FormData();
        if (data?.image?.name) {
            formData.append('file', data.image);
        }
        delete data?.image;
        formData.append('data', JSON.stringify(adminData));

        // console.log(data);
        // console.log(Object.fromEntries(formData));

        const toastId = toast.loading('Creating...');
        const res = (await addAdmin(formData)) as TResponse<TAdmin>;
        if (res.data) {
            toast.success(res.data.message, { id: toastId });
            fromResetRef?.current?.resetFrom();
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };
    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Create New Admin Account
            </h2>
            <Row style={{ marginBottom: '2rem' }}>
                <Col span={24}>
                    <UFrom
                        onSubmit={handleSubmit}
                        resolver={zodResolver(adminSchema)}
                        fncRef={fromResetRef}
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
                                    label="Middle Name (Optional)"
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
                            <Col span={24}>
                                <UInput
                                    name="designation"
                                    label="Designation"
                                    placeholder="Designation"
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

export default CreateAdmin;
