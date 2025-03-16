import { Button, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';
const { Header, Content } = Layout;

const MainLayout = () => {
    const dispatch = useAppDispatch();

    return (
        <Layout style={{ height: '100vh' }}>
            <Sidebar />
            <Layout>
                <Header
                    style={{
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Button onClick={() => dispatch(logout())}>Logout</Button>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
