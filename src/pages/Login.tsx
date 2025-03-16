import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useLoginMutation } from '../redux/features/auth/authApi';
import verifyToken from '../utils/verifyToken';
import { useAppDispatch } from '../redux/hooks';
import { IUser, setUser } from '../redux/features/auth/authSlice';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type TCredentials = {
    id: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();

    const onFinish = async (credentials: TCredentials) => {
        const res = await login(credentials).unwrap();
        const token = res.data.accessToken;
        const user = verifyToken(token) as IUser;
        dispatch(setUser({ user, token }));

        toast.promise(res, {
            loading: 'Logging in...',
            success: () => 'Logged in successfully',
            error: 'Something went wrong',
        });
        navigate(`/${user.role}/dashboard`);
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '20rem',
                }}
            >
                <img src={logo} alt="Apollo University" />
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your ID!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="ID" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
