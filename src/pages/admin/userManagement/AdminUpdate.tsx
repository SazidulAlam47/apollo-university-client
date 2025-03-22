import { useNavigate, useParams } from 'react-router-dom';
import { TResponse, TAdmin } from '../../../types';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Col, Divider, Row } from 'antd';
import UFrom from '../../../components/form/UFrom';
import UInput from '../../../components/form/UInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminSchema } from '../../../schemas/userManagement.schema';
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
import {
    useGetSingleAdminQuery,
    useUpdateAdminMutation,
} from '../../../redux/features/admin/userManagement/adminManagement';

dayjs.locale('zh-cn');

const AdminUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: adminData, isLoading: isAdminLoading } =
        useGetSingleAdminQuery(id as string);

    const [updateAdmin] = useUpdateAdminMutation();

    if (isAdminLoading) {
        return <Loader />;
    }

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const adminData = {
            admin: data,
        };

        const formData = new FormData();
        if (data?.image?.name) {
            formData.append('file', data.image);
        }
        delete data?.image;
        formData.append('data', JSON.stringify(adminData));

        // console.log(adminData);

        // console.log(Object.fromEntries(formData));

        const toastId = toast.loading('Updating...');
        const res = (await updateAdmin({
            data: formData,
            id: id as string,
        })) as TResponse<TAdmin>;
        if (res.data) {
            toast.success(res.data.message, { id: toastId });
            navigate(`/admin/admins-data/${id}`);
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    const admin = adminData.data as TAdmin;

    const defaultAdminValues = {
        ...admin,
        dateOfBirth: dayjs(admin.dateOfBirth, 'YYYY-MM-DD'),
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Update Admin Account
            </h2>
            <Row style={{ marginBottom: '2rem' }}>
                <Col span={24}>
                    <UFrom
                        onSubmit={handleSubmit}
                        resolver={zodResolver(adminSchema)}
                        defaultValues={defaultAdminValues}
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
                            <Col span={24}>
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

export default AdminUpdate;
