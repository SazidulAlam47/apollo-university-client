import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo-w.png';
import sidebarItemsGenerator from '../../utils/sidebarItemsGenerator';
import adminPaths from '../../routes/adminPaths';
import facultyPaths from '../../routes/facultyPaths';
import studentPaths from '../../routes/studentPaths';

const { Sider } = Layout;

const UserRoles = {
    admin: 'admin',
    faculty: 'faculty',
    student: 'student',
};

const Sidebar = () => {
    const role = 'admin';

    let sidebarItems;

    switch (role) {
        case UserRoles.admin:
            sidebarItems = sidebarItemsGenerator(adminPaths, 'admin');
            break;
        case UserRoles.faculty:
            sidebarItems = sidebarItemsGenerator(facultyPaths, 'faculty');
            break;
        case UserRoles.student:
            sidebarItems = sidebarItemsGenerator(studentPaths, 'student');
            break;
        default:
            break;
    }

    return (
        <Sider breakpoint="lg" collapsedWidth="0">
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
                items={sidebarItems}
            />
        </Sider>
    );
};

export default Sidebar;
