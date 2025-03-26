import StudentDashboard from '../pages/student/StudentDashboard';
import StudentEnrolledCourses from '../pages/student/StudentEnrolledCourses';
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
    {
        name: 'My Enrolled Courses',
        path: 'enrolled-courses',
        element: <StudentEnrolledCourses />,
    },
];

export default studentPaths;
