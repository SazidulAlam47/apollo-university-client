import { Button, Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/auth.slice';
import { toast } from 'sonner';
const { Header, Content } = Layout;

const MainLayout = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
    };

    return (
        <Layout
            style={{
                height: '100%',
                minHeight: '100vh',
            }}
        >
            <Sidebar />
            <Layout>
                <Header
                    style={{
                        color: 'white',
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Link to="/change-password">
                        <Button type="link" style={{ color: 'white' }}>
                            Change Password
                        </Button>
                    </Link>
                    <Button onClick={handleLogout}>Logout</Button>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
