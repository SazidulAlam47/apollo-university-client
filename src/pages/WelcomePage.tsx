import { Card, Avatar, Typography, Space, Divider } from 'antd';
import { useGetMeQuery } from '../redux/features/user/user.api';
import Loader from '../components/loader/Loader';

const { Title, Text } = Typography;

const WelcomePage = () => {
    const { data, isLoading, error } = useGetMeQuery(undefined);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Title style={{ textAlign: 'center', marginTop: 50, color: 'red' }}>
                Error loading user data
            </Title>
        );
    }

    const user = data?.data;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '85vh',
                background: '#f0f2f5',
            }}
        >
            <Card
                style={{
                    width: 450,
                    textAlign: 'center',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    background: '#fff',
                }}
            >
                {/* Welcome Text */}
                <Title level={2} style={{ color: '#1890ff' }}>
                    Welcome, {user.name.firstName}! 🎉
                </Title>

                {/* User Profile Image */}
                <Avatar
                    src={user.profileImg}
                    alt={user.fullName}
                    size={120}
                    style={{
                        display: 'block',
                        margin: 'auto',
                        border: '4px solid #1890ff',
                    }}
                />

                <Divider />

                <Space
                    direction="vertical"
                    size="middle"
                    style={{ textAlign: 'left', width: '100%' }}
                >
                    <Title
                        level={3}
                        style={{ textAlign: 'center', color: '#333' }}
                    >
                        {user.fullName}
                    </Title>
                    <Text>
                        <strong>Email:</strong> {user.email}
                    </Text>
                    <Text>
                        <strong>Contact:</strong> {user.contactNumber}
                    </Text>

                    {user?.academicFaculty && (
                        <Text>
                            <strong>Faculty:</strong>{' '}
                            {user.academicFaculty?.name}
                        </Text>
                    )}

                    {user?.academicDepartment && (
                        <Text>
                            <strong>Department:</strong>{' '}
                            {user.academicDepartment?.name}
                        </Text>
                    )}
                    {user?.admissionSemester && (
                        <Text>
                            <strong>Admission Semester:</strong>{' '}
                            {user.admissionSemester?.name}{' '}
                            {user.admissionSemester?.year}
                        </Text>
                    )}
                </Space>
            </Card>
        </div>
    );
};

export default WelcomePage;
