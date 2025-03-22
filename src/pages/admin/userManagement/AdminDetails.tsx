import { Link, useParams } from 'react-router-dom';
import { Button, Flex, Table } from 'antd';
import { useGetSingleAdminQuery } from '../../../redux/features/admin/userManagement/adminManagement';
import Loader from '../../../components/loader/Loader';

const AdminDetails = () => {
    const { id } = useParams();
    const { data: adminData, isLoading } = useGetSingleAdminQuery(id as string);

    if (isLoading) {
        return <Loader />;
    }

    if (!adminData?.data) {
        return (
            <Flex justify="center" align="center" style={{ height: '85vh' }}>
                <h2>No admin data found.</h2>
            </Flex>
        );
    }

    const admin = adminData.data;

    const columns = [
        {
            title: 'Field',
            dataIndex: 'field',
            key: 'field',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    const data = [
        { key: '1', field: 'Full Name', value: admin.fullName },
        { key: '2', field: 'Gender', value: admin.gender },
        {
            key: '3',
            field: 'Date of Birth',
            value: new Date(admin.dateOfBirth).toLocaleDateString('en-GB'),
        },
        { key: '4', field: 'Email', value: admin.email },
        { key: '5', field: 'Contact Number', value: admin.contactNumber },
        { key: '6', field: 'Blood Group', value: admin.bloodGroup },
        { key: '7', field: 'Present Address', value: admin.presentAddress },
        { key: '8', field: 'Permanent Address', value: admin.permanentAddress },
        { key: '9', field: 'Designation', value: admin.designation },
    ];

    return (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Flex justify="space-between">
                <div />
                <img
                    src={admin.profileImg}
                    alt={admin.fullName}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        marginBottom: 20,
                    }}
                />
                <Link
                    to={`/admin/admin-update/${id}`}
                    style={{
                        display: 'block',
                        margin: '20px 0',
                        alignSelf: 'end',
                    }}
                >
                    <Button>Update Admin</Button>
                </Link>
            </Flex>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    );
};

export default AdminDetails;
