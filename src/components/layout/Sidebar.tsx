import { Layout, Menu } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo-w.png';
import sidebarItemsGenerator from '../../utils/sidebarItemsGenerator';
import adminPaths from '../../routes/adminPaths';
import facultyPaths from '../../routes/facultyPaths';
import studentPaths from '../../routes/studentPaths';
import { useAppSelector } from '../../redux/hooks';
import { currentToken, IUser } from '../../redux/features/auth/auth.slice';
import verifyToken from '../../utils/verifyToken';
import './Sidebar.css';

const { Sider } = Layout;

const UserRoles = {
    admin: 'admin',
    superAdmin: 'superAdmin',
    faculty: 'faculty',
    student: 'student',
};

const Sidebar = () => {
    const navigate = useNavigate();
    const token = useAppSelector(currentToken);
    if (!token) {
        navigate('/login');
        return;
    }
    const user = verifyToken(token) as IUser;

    let sidebarItems;

    switch (user!.role) {
        case UserRoles.admin:
        case UserRoles.superAdmin:
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
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{
                height: '100%',
                minHeight: '100vh',
                position: 'sticky',
                top: '0',
                zIndex: 1000,
            }}
        >
            <div className="sidebar-mobile-spacer" />
            <NavLink to="/">
                <img
                    src={logo}
                    alt="Apollo University"
                    style={{
                        maxWidth: '80%',
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
