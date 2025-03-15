import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import adminPaths from './adminPaths';
import routesGenerator from '../utils/routesGenerator';
import facultyPaths from './facultyPaths';
import studentPaths from './studentPaths';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/admin',
        element: <App />,
        children: routesGenerator(adminPaths),
    },
    {
        path: '/faculty',
        element: <App />,
        children: routesGenerator(facultyPaths),
    },
    {
        path: '/student',
        element: <App />,
        children: routesGenerator(studentPaths),
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

export default router;
