import { Link, useParams } from 'react-router-dom';
import { Button, Flex, Table } from 'antd';
import { useGetSingleFacultyQuery } from '../../../redux/features/admin/userManagement/facultyManagement.api';
import Loader from '../../../components/loader/Loader';

const FacultyDetails = () => {
    const { id } = useParams();
    const { data: facultyData, isLoading } = useGetSingleFacultyQuery(
        id as string,
    );

    if (isLoading) {
        return <Loader />;
    }

    if (!facultyData?.success) {
        return (
            <Flex justify="center" align="center" style={{ height: '85vh' }}>
                <h2>No faculty data found.</h2>
            </Flex>
        );
    }

    const faculty = facultyData.data;

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
        { key: '1', field: 'Full Name', value: faculty.fullName },
        { key: '2', field: 'Gender', value: faculty.gender },
        {
            key: '3',
            field: 'Date of Birth',
            value: new Date(faculty.dateOfBirth).toLocaleDateString('en-GB'),
        },
        { key: '4', field: 'Email', value: faculty.email },
        { key: '5', field: 'Contact Number', value: faculty.contactNumber },
        { key: '6', field: 'Blood Group', value: faculty.bloodGroup },
        { key: '7', field: 'Present Address', value: faculty.presentAddress },
        {
            key: '8',
            field: 'Permanent Address',
            value: faculty.permanentAddress,
        },
        { key: '9', field: 'Designation', value: faculty.designation },
        {
            key: '10',
            field: 'Department',
            value: faculty.academicDepartment.name,
        },
        { key: '11', field: 'Faculty', value: faculty.academicFaculty.name },
    ];

    return (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Flex justify="space-between">
                <div />
                <img
                    src={faculty.profileImg}
                    alt={faculty.fullName}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        marginBottom: 20,
                    }}
                />
                <Link
                    to={`/admin/faculty-update/${id}`}
                    style={{
                        display: 'block',
                        margin: '20px 0',
                        alignSelf: 'end',
                    }}
                >
                    <Button>Update Faculty</Button>
                </Link>
            </Flex>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ x: 'max-content' }}
            />
        </div>
    );
};

export default FacultyDetails;
