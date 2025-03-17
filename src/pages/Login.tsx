import { Button } from 'antd';
import { useLoginMutation } from '../redux/features/auth/authApi';
import verifyToken from '../utils/verifyToken';
import { useAppDispatch } from '../redux/hooks';
import { IUser, setUser } from '../redux/features/auth/authSlice';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import UFrom from '../components/form/UFrom';
import UInput from '../components/form/UInput';
import { FieldValues } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();

    const onSubmit = async (data: FieldValues) => {
        const res = await login(data).unwrap();
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
                <UFrom
                    onSubmit={onSubmit}
                    defaultValues={{ id: 'A-0001', password: 'Admin123' }}
                >
                    <UInput
                        name="id"
                        placeholder="ID"
                        type="text"
                        // registerOptions={{ required: 'Please enter your ID' }}
                    />
                    <UInput
                        name="password"
                        placeholder="Password"
                        type="password"
                        // registerOptions={{
                        //     required: 'Please enter your Password',
                        // }}
                    />
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                </UFrom>
            </div>
        </div>
    );
};

export default Login;
