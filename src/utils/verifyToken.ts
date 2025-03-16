import { jwtDecode } from 'jwt-decode';

const verifyToken = (token: string) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        return error;
    }
};

export default verifyToken;
