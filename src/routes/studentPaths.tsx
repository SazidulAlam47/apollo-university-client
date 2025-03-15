import StudentDashboard from '../pages/student/StudentDashboard';
import { TPath } from '../types';

const studentPaths: TPath[] = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <StudentDashboard />,
    },
];

export default studentPaths;
