import { TPath, TRoute } from '../types';

const routesGenerator = (paths: TPath[]) => {
    return paths.reduce((acc: TRoute[], item) => {
        if (item.path && item.element) {
            acc.push({
                path: item.path,
                element: item.element,
            });
        }
        if (item.children?.length) {
            item.children.forEach((child) => {
                if (child.path && child.element) {
                    acc.push({
                        path: child.path,
                        element: child.element,
                    });
                }
            });
        }
        return acc;
    }, []);
};

export default routesGenerator;
