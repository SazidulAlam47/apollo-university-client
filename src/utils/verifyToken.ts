/* eslint-disable no-console */
import { jwtDecode } from 'jwt-decode';

const verifyToken = (token: string) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default verifyToken;
