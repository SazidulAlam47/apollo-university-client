import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import adminPaths from './adminPaths';
import routesGenerator from '../utils/routesGenerator';
import facultyPaths from './facultyPaths';
import studentPaths from './studentPaths';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Login from '../pages/auth/Login';
import ChangePassword from '../pages/auth/ChangePassword';
import WelcomePage from '../pages/WelcomePage';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '',
                element: <WelcomePage />,
            },
        ],
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute role="admin">
                <App />
            </ProtectedRoute>
        ),
        children: routesGenerator(adminPaths),
    },
    {
        path: '/faculty',
        element: (
            <ProtectedRoute role="faculty">
                <App />
            </ProtectedRoute>
        ),
        children: routesGenerator(facultyPaths),
    },
    {
        path: '/student',
        element: (
            <ProtectedRoute role="student">
                <App />
            </ProtectedRoute>
        ),
        children: routesGenerator(studentPaths),
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/change-password',
        element: (
            <ProtectedRoute>
                <ChangePassword />
            </ProtectedRoute>
        ),
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reset-password',
        element: <ResetPassword />,
    },
]);

export default router;
