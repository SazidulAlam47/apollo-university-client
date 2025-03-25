import { ReactNode } from 'react';
import { currentToken, IUser } from '../../redux/features/auth/auth.slice';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import verifyToken from '../../utils/verifyToken';

type ProtectedRouteProps = {
    children: ReactNode;
    role?: 'admin' | 'faculty' | 'student';
};

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
    const token = useAppSelector(currentToken);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const user = verifyToken(token) as IUser;

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (role && user?.role !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
