import { ReactNode } from 'react';
import { currentToken } from '../../redux/features/auth/auth.slice';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(currentToken);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
