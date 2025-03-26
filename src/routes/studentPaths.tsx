import StudentEnrolledCourses from '../pages/student/StudentEnrolledCourses';
import StudentOfferedCourse from '../pages/student/StudentOfferedCourse';
import WelcomePage from '../pages/WelcomePage';
import { TPath } from '../types';

const studentPaths: TPath[] = [
    {
        path: '/student',
        element: <WelcomePage />,
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
