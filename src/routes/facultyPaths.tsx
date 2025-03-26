import FacultyCourseStudents from '../pages/faculty/FacultyCourseStudents';
import FacultyOfferedCourses from '../pages/faculty/FacultyOfferedCourses';
import WelcomePage from '../pages/WelcomePage';
import { TPath } from '../types';

const facultyPaths: TPath[] = [
    {
        path: '/faculty',
        element: <WelcomePage />,
    },
    {
        name: 'My Courses',
        path: 'courses',
        element: <FacultyOfferedCourses />,
    },
    {
        path: 'courses/:offeredCourseId',
        element: <FacultyCourseStudents />,
    },
];

export default facultyPaths;
