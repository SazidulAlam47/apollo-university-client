import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import { TPath } from '../types';

const facultyPaths: TPath[] = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <FacultyDashboard />,
    },
];

export default facultyPaths;
