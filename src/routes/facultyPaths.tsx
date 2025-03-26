import WelcomePage from '../pages/WelcomePage';
import { TPath } from '../types';

const facultyPaths: TPath[] = [
    {
        path: '/faculty',
        element: <WelcomePage />,
    },
    // {
    //     name: 'Dashboard',
    //     path: 'dashboard',
    //     element: <FacultyDashboard />,
    // },
];

export default facultyPaths;
