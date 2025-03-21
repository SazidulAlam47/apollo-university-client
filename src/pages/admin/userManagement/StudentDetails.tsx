import { Link, useParams } from 'react-router-dom';
import { Button, Flex, Table } from 'antd';
import { useGetSingleStudentQuery } from '../../../redux/features/admin/userManagement/studentManagement.api';
import Loader from '../../../components/loader/Loader';

const StudentDetails = () => {
    const { id } = useParams();
    const { data: studentData, isLoading } = useGetSingleStudentQuery(
        id as string,
    );

    if (isLoading) {
        return <Loader />;
    }

    if (!studentData?.success) {
        return (
            <Flex justify="center" align="center" style={{ height: '85vh' }}>
                <h2>No student data found.</h2>
            </Flex>
        );
    }

    const student = studentData.data;

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
        { key: '1', field: 'Full Name', value: student.fullName },
        { key: '2', field: 'Gender', value: student.gender },
        {
            key: '3',
            field: 'Date of Birth',
            value: new Date(student.dateOfBirth).toLocaleDateString('en-GB'),
        },
        { key: '4', field: 'Email', value: student.email },
        { key: '5', field: 'Contact Number', value: student.contactNumber },
        {
            key: '6',
            field: 'Emergency Contact',
            value: student.emergencyContact,
        },
        { key: '7', field: 'Blood Group', value: student.bloodGroup },
        { key: '8', field: 'Present Address', value: student.presentAddress },
        {
            key: '9',
            field: 'Permanent Address',
            value: student.permanentAddress,
        },
        {
            key: '10.1',
            field: 'Father',
            value: `${student.guardian.fatherName} (${student.guardian.fatherOccupation}). Contact: ${student.guardian.fatherContact}`,
        },
        {
            key: '10.2',
            field: 'Mother',
            value: `${student.guardian.motherName} (${student.guardian.motherOccupation}). Contact: ${student.guardian.motherContact}`,
        },
        {
            key: '11.1',
            field: 'Local Guardian',
            value: `${student.localGuardian.name} (${student.localGuardian.occupation}). Contact: ${student.localGuardian.contactNo}`,
        },
        {
            key: '11.2',
            field: 'Local Guardian Address',
            value: student.localGuardian.address,
        },
        {
            key: '12',
            field: 'Department',
            value: student.academicDepartment.name,
        },
        {
            key: '13',
            field: 'Faculty',
            value: student.academicFaculty.name,
        },
        {
            key: '14',
            field: 'Admission Semester',
            value: `${student.admissionSemester.name} - ${student.admissionSemester.year}`,
        },
    ];

    return (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Flex justify="space-between">
                <div />
                <img
                    src={student.profileImg}
                    alt={student.fullName}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        marginBottom: 20,
                    }}
                />
                <Link
                    to={`/admin/student-update/${id}`}
                    style={{
                        display: 'block',
                        margin: '20px 0',
                        alignSelf: 'end',
                    }}
                >
                    <Button>Update Student</Button>
                </Link>
            </Flex>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    );
};

export default StudentDetails;
