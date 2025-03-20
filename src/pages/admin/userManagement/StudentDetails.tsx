import { useParams } from 'react-router-dom';
import { Flex, Table } from 'antd';
import { useGetSingleStudentQuery } from '../../../redux/features/admin/userManagement/userManagement.api';
import Loader from '../../../components/loader/Loader';

const StudentDetails = () => {
    const { id } = useParams();
    const { data: studentData, isLoading } = useGetSingleStudentQuery(
        id as string,
    );

    if (isLoading) {
        return <Loader />;
    }

    if (!studentData?.data) {
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
            value: new Date(student.dateOfBirth).toLocaleDateString(),
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
            key: '10',
            field: 'Guardian',
            value: `${student.guardian.fatherName} (Father) / ${student.guardian.motherName} (Mother)`,
        },
        {
            key: '11',
            field: 'Local Guardian',
            value: student.localGuardian.name,
        },
        {
            key: '12',
            field: 'Department',
            value: student.academicDepartment.name,
        },
        {
            key: '13',
            field: 'Faculty',
            value: student.academicDepartment.academicFaculty.name,
        },
        {
            key: '14',
            field: 'Admission Semester',
            value: `${student.admissionSemester.name} ${student.admissionSemester.year}`,
        },
    ];

    return (
        <div style={{ textAlign: 'center' }}>
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
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    );
};

export default StudentDetails;
