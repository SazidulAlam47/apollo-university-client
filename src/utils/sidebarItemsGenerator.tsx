import { NavLink } from 'react-router-dom';
import { TPath, TSidebarItem } from '../types';

const sidebarItemsGenerator = (
    paths: TPath[],
    role: 'admin' | 'faculty' | 'student',
) => {
    return paths.reduce((acc: TSidebarItem[], item) => {
        if (item.path && item.name) {
            acc.push({
                key: item.name,
                label: (
                    <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>
                ),
            });
        }
        if (item.children?.length && item.name) {
            acc.push({
                key: item.name,
                label: item.name,
                children: item.children.reduce(
                    (accChild: TSidebarItem[], itemChild) => {
                        if (itemChild.path && itemChild.name) {
                            accChild.push({
                                key: itemChild.name,
                                label: (
                                    <NavLink to={`/${role}/${itemChild.path}`}>
                                        {itemChild.name}
                                    </NavLink>
                                ),
                            });
                        }
                        return accChild;
                    },
                    [],
                ),
            });
        }
        return acc;
    }, []);
};

export default sidebarItemsGenerator;
