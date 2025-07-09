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
                background: '#f5f6fa',
                padding: 16,
            }}
        >
            <Col
                xs={{ span: 24 }}
                sm={{ span: 18, offset: 3 }}
                md={{ span: 12, offset: 6 }}
                lg={{ span: 10, offset: 0 }}
                xl={{ span: 10, offset: 0 }}
                style={{
                    maxWidth: 400,
                    width: '100%',
                    margin: '0 auto',
                }}
            >
                <img
                    src={logo}
                    alt="Apollo University"
                    style={{
                        width: '100%',
                        maxWidth: 250,
                        display: 'block',
                        margin: '0 auto 24px auto',
                    }}
                />
                <UFrom
                    onSubmit={onSubmit}
                    resolver={zodResolver(loginSchema)}
                    values={values}
                >
                    <UInputId />
                    <UInputPassword />
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        style={{ marginTop: 8, marginBottom: 8 }}
                    >
                        Login
                    </Button>
                </UFrom>
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 8,
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
                        gap: 10,
                        marginTop: 10,
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
