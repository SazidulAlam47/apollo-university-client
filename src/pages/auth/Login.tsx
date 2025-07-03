import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { useLoginMutation } from '../../redux/features/auth/auth.api';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { TLogin, TResponse } from '../../types';
import verifyToken from '../../utils/verifyToken';
import { IUser, setUser } from '../../redux/features/auth/auth.slice';
import { Button, Col, Flex } from 'antd';
import UFrom from '../../components/form/UFrom';
import { loginSchema } from '../../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import UInputId from '../../components/form/UInputId';
import UInputPassword from '../../components/form/UInputPassword';
import logo from '../../assets/images/logo.png';
import {
    adminLogin,
    defaultLogin,
    facultyLogin,
    studentLogin,
} from '../../constants/credentials';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();
    const [values, setValues] = useState(defaultLogin);

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Logging in...');
        const res = (await login(data)) as TResponse<TLogin>;

        if (res.data) {
            const token = res.data.data.accessToken;
            const user = verifyToken(token) as IUser;
            dispatch(setUser({ user, token }));
            if (res.data.data.needsPasswordChange) {
                navigate('/change-password');
            } else {
                navigate('/');
            }
            toast.success(res.data.message, { id: toastId });
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    return (
        <Flex
            justify="center"
            align="center"
            style={{
                width: '100%',
                height: '100vh',
            }}
        >
            <Col span={5}>
                <img src={logo} alt="Apollo University" />
                <UFrom
                    onSubmit={onSubmit}
                    resolver={zodResolver(loginSchema)}
                    values={values}
                >
                    <UInputId />
                    <UInputPassword />
                    <Button block type="primary" htmlType="submit">
                        Login
                    </Button>
                </UFrom>
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: '8px',
                    }}
                >
                    <Link to="/forgot-password">
                        <Button type="link">Forgot Password</Button>
                    </Link>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        marginTop: '10px',
                    }}
                >
                    <Button
                        type="default"
                        onClick={() => setValues(adminLogin)}
                    >
                        Login as Admin
                    </Button>
                    <Button
                        type="default"
                        onClick={() => setValues(facultyLogin)}
                    >
                        Login as Faculty
                    </Button>
                    <Button
                        type="default"
                        onClick={() => setValues(studentLogin)}
                    >
                        Login as Student
                    </Button>
                </div>
            </Col>
        </Flex>
    );
};

export default Login;
