import { NavLink } from 'react-router-dom';
import { TPath, TSidebarItem } from '../types';

const sidebarItemsGenerator = (
    paths: TPath[],
    role: 'admin' | 'faculty' | 'student',
) => {
    return paths.reduce((acc: TSidebarItem[], item: TPath) => {
        if (item.path) {
            acc.push({
                key: item.name,
                label: (
                    <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>
                ),
            });
        }
        if (item.children) {
            acc.push({
                key: item.name,
                label: item.name,
                children: item.children.map((child) => ({
                    key: child.name,
                    label: (
                        <NavLink to={`/${role}/${child.path}`}>
                            {child.name}
                        </NavLink>
                    ),
                })),
            });
        }
        return acc;
    }, []);
};

export default sidebarItemsGenerator;
