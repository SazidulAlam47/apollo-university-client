import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
const { Header, Content } = Layout;

const MainLayout = () => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Sidebar />
            <Layout>
                <Header style={{ color: 'white' }}>something</Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
