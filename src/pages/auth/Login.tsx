import { useNavigate } from 'react-router-dom';
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

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();

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
                navigate(`/${user.role}/dashboard`);
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
                    defaultValues={{ id: '2026030001', password: 'Test@123' }} //TODO: only for development
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
