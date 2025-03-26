import StudentDashboard from '../pages/student/StudentDashboard';
import StudentOfferedCourse from '../pages/student/StudentOfferedCourse';
import { TPath } from '../types';

const studentPaths: TPath[] = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <StudentDashboard />,
    },
    {
        name: 'My Offered Courses',
        path: 'offered-courses',
        element: <StudentOfferedCourse />,
    },
];

export default studentPaths;
