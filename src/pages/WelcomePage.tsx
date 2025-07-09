import { Card, Avatar, Typography, Space, Divider } from 'antd';
import { useGetMeQuery } from '../redux/features/user/user.api';
import Loader from '../components/loader/Loader';
import './WelcomePage.css';

const { Title, Text } = Typography;

const WelcomePage = () => {
    const { data, isLoading } = useGetMeQuery(undefined);

    if (isLoading) {
        return <Loader />;
    }

    const user = data?.data;

    if (!user) {
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
                <Card className="welcome-desktop-card">
                    <Title level={2} style={{ color: '#1890ff', margin: 0 }}>
                        Welcome Back!
                    </Title>
                </Card>
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '85vh',
            }}
        >
            <div className="welcome-desktop-card">
                <Space direction="vertical" size="middle">
                    <Avatar
                        src={user.profileImg}
                        alt={user.fullName}
                        size={120}
                        style={{
                            display: 'block',
                            margin: 'auto',
                        }}
                    />

                    <Title
                        level={3}
                        style={{
                            textAlign: 'center',
                            color: '#333',
                            marginBottom: 0,
                        }}
                    >
                        {user.fullName}
                    </Title>
                </Space>
                <Divider style={{ margin: '18px 0' }} />

                <Space
                    direction="vertical"
                    size="middle"
                    style={{ textAlign: 'left', width: '100%' }}
                >
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
            </div>
        </div>
    );
};

export default WelcomePage;
