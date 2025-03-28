import AcademicDepartment from '../pages/admin/academicManagement/AcademicDepartment';
import AcademicFaculty from '../pages/admin/academicManagement/AcademicFaculty';
import AcademicSemester from '../pages/admin/academicManagement/AcademicSemester';
import CreateAcademicDepartment from '../pages/admin/academicManagement/CreateAcademicDepartment';
import CreateAcademicFaculty from '../pages/admin/academicManagement/CreateAcademicFaculty';
import CreateAcademicSemester from '../pages/admin/academicManagement/CreateAcademicSemester';
import CoursesData from '../pages/admin/courseManagement/CoursesData';
import CourseUpdate from '../pages/admin/courseManagement/CourseUpdate';
import CreateCourse from '../pages/admin/courseManagement/CreateCourse';
import CreateOfferedCourse from '../pages/admin/courseManagement/CreateOfferedCourse';
import OfferedCourseData from '../pages/admin/courseManagement/OfferedCourseData';
import OfferedCourseUpdate from '../pages/admin/courseManagement/OfferedCourseUpdate';
import RegisteredSemesters from '../pages/admin/courseManagement/RegisteredSemesters';
import SemesterRegistration from '../pages/admin/courseManagement/SemesterRegistration';
import AdminDetails from '../pages/admin/userManagement/AdminDetails';
import AdminsData from '../pages/admin/userManagement/AdminsData';
import AdminUpdate from '../pages/admin/userManagement/AdminUpdate';
import CreateAdmin from '../pages/admin/userManagement/CreateAdmin';
import CreateFaculty from '../pages/admin/userManagement/CreateFaculty';
import CreateStudent from '../pages/admin/userManagement/CreateStudent';
import FacultiesData from '../pages/admin/userManagement/FacultiesData';
import FacultyDetails from '../pages/admin/userManagement/FacultyDetails';
import FacultyUpdate from '../pages/admin/userManagement/FacultyUpdate';
import StudentDetails from '../pages/admin/userManagement/StudentDetails';
import StudentsData from '../pages/admin/userManagement/StudentsData';
import StudentUpdate from '../pages/admin/userManagement/StudentUpdate';
import WelcomePage from '../pages/WelcomePage';
import { TPath } from '../types';

const adminPaths: TPath[] = [
    {
        name: 'Academic Management',
        children: [
            {
                path: '/admin',
                element: <WelcomePage />,
            },
            {
                name: 'Create A. Semester',
                path: 'create-academic-semester',
                element: <CreateAcademicSemester />,
            },
            {
                name: 'Academic Semester',
                path: 'academic-semester',
                element: <AcademicSemester />,
            },
            {
                name: 'Create A. Faculty',
                path: 'create-academic-faculty',
                element: <CreateAcademicFaculty />,
            },
            {
                name: 'Academic Faculty',
                path: 'academic-faculty',
                element: <AcademicFaculty />,
            },
            {
                name: 'Create A. Department',
                path: 'create-academic-department',
                element: <CreateAcademicDepartment />,
            },
            {
                name: 'Academic Department',
                path: 'academic-department',
                element: <AcademicDepartment />,
            },
        ],
    },
    {
        name: 'User Management',
        children: [
            {
                name: 'Create Student',
                path: 'create-student',
                element: <CreateStudent />,
            },
            {
                name: 'Students',
                path: 'students-data',
                element: <StudentsData />,
            },
            {
                path: 'students-data/:id',
                element: <StudentDetails />,
            },
            {
                path: 'student-update/:id',
                element: <StudentUpdate />,
            },
            {
                name: 'Create Faculty',
                path: 'create-faculty',
                element: <CreateFaculty />,
            },
            {
                name: 'Faculties',
                path: 'faculties-data',
                element: <FacultiesData />,
            },
            {
                path: 'faculties-data/:id',
                element: <FacultyDetails />,
            },
            {
                path: 'faculty-update/:id',
                element: <FacultyUpdate />,
            },
            {
                name: 'Create Admin',
                path: 'create-admin',
                element: <CreateAdmin />,
            },
            {
                name: 'Admins',
                path: 'admins-data',
                element: <AdminsData />,
            },
            {
                path: 'admins-data/:id',
                element: <AdminDetails />,
            },
            {
                path: 'admin-update/:id',
                element: <AdminUpdate />,
            },
        ],
    },
    {
        name: 'Course Management',
        children: [
            {
                name: 'Semester Registration',
                path: 'semester-registration',
                element: <SemesterRegistration />,
            },
            {
                name: 'Registered Semesters',
                path: 'registered-semesters',
                element: <RegisteredSemesters />,
            },
            {
                name: 'Create Course',
                path: 'create-course',
                element: <CreateCourse />,
            },
            {
                name: 'Courses',
                path: 'courses',
                element: <CoursesData />,
            },
            {
                path: 'course-update/:id',
                element: <CourseUpdate />,
            },
            {
                name: 'Offer Course',
                path: 'create-offered-course',
                element: <CreateOfferedCourse />,
            },
            {
                name: 'Offered Courses',
                path: 'offered-courses',
                element: <OfferedCourseData />,
            },
            {
                path: 'offered-course-update/:id',
                element: <OfferedCourseUpdate />,
            },
        ],
    },
];

export default adminPaths;
