import { Button, Col, Flex } from 'antd';
import { useLoginMutation } from '../redux/features/auth/authApi';
import verifyToken from '../utils/verifyToken';
import { useAppDispatch } from '../redux/hooks';
import { IUser, setUser } from '../redux/features/auth/authSlice';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import UFrom from '../components/form/UFrom';
import { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UInputId from '../components/form/UInputId';
import UInputPassword from '../components/form/UInputPassword';
import { loginSchema } from '../schemas/login.schema';
import { toast } from 'sonner';
import { TResponse } from '../types';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Logging in...');
        const res = (await login(data)) as TResponse;

        if (res.data) {
            const token = res.data.data.accessToken as string;
            const user = verifyToken(token) as IUser;
            dispatch(setUser({ user, token }));
            navigate(`/${user.role}/dashboard`);
            toast.success(res.data.message, { id: toastId });
        }
        if (res.error) {
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
                    defaultValues={{ id: 'A-0001', password: 'Admin123' }}
                >
                    <UInputId />
                    <UInputPassword />
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                </UFrom>
            </Col>
        </Flex>
    );
};

export default Login;
