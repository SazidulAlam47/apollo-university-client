import AcademicDepartment from '../pages/admin/academicManagement/AcademicDepartment';
import AcademicFaculty from '../pages/admin/academicManagement/AcademicFaculty';
import AcademicSemester from '../pages/admin/academicManagement/AcademicSemester';
import CreateAcademicDepartment from '../pages/admin/academicManagement/CreateAcademicDepartment';
import CreateAcademicFaculty from '../pages/admin/academicManagement/CreateAcademicFaculty';
import CreateAcademicSemester from '../pages/admin/academicManagement/CreateAcademicSemester';
import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateAdmin from '../pages/admin/userManagement/CreateAdmin';
import CreateFaculty from '../pages/admin/userManagement/CreateFaculty';
import CreateStudent from '../pages/admin/userManagement/CreateStudent';
import FacultiesData from '../pages/admin/userManagement/FacultiesData';
import FacultyDetails from '../pages/admin/userManagement/FacultyDetails';
import FacultyUpdate from '../pages/admin/userManagement/FacultyUpdate';
import StudentDetails from '../pages/admin/userManagement/StudentDetails';
import StudentsData from '../pages/admin/userManagement/StudentsData';
import StudentUpdate from '../pages/admin/userManagement/StudentUpdate';
import { TPath } from '../types';

const adminPaths: TPath[] = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard />,
    },
    {
        name: 'Academic Management',
        children: [
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
        ],
    },
];

export default adminPaths;
