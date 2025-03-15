import { Layout, Menu } from 'antd';
import logo from '../../assets/images/logo-w.png';
import { NavLink, Outlet } from 'react-router-dom';
import { adminSidebarItems } from '../../routes/adminRoutes';
const { Header, Content, Footer, Sider } = Layout;

// const items: MenuProps['items'] = [
//     {
//         key: '1',
//         label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
//     },
//     {
//         key: '2',
//         label: 'User Management',
//         children: [
//             {
//                 key: '3',
//                 label: <NavLink to="/admin/create-admin">Create Admin</NavLink>,
//             },
//             {
//                 key: '4',
//                 label: (
//                     <NavLink to="/admin/create-faculty">Create Faculty</NavLink>
//                 ),
//             },
//         ],
//     },
// ];

const MainLayout = () => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                // onBreakpoint={(broken) => {
                //     console.log(broken);
                // }}
                // onCollapse={(collapsed, type) => {
                //     console.log(collapsed, type);
                // }}
            >
                <NavLink to="/">
                    <img
                        src={logo}
                        alt="Apollo University"
                        style={{
                            width: '80%',
                            margin: 'auto',
                            display: 'block',
                        }}
                    />
                </NavLink>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={adminSidebarItems}
                />
            </Sider>
            <Layout>
                <Header style={{ color: 'white' }}>something</Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
