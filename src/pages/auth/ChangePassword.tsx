import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { useChangePasswordMutation } from '../../redux/features/auth/auth.api';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { TResponse } from '../../types';
import { logout } from '../../redux/features/auth/auth.slice';
import { Button, Col, Flex } from 'antd';
import UFrom from '../../components/form/UFrom';
import { changePasswordSchema } from '../../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';

import UInputPassword from '../../components/form/UInputPassword';

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [changePassword] = useChangePasswordMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Changing...');
        const res = (await changePassword(data)) as TResponse<null>;
        if (res.data) {
            toast.success(res.data.message, { id: toastId });
            dispatch(logout());
            navigate('/login');
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
                <h2 style={{ textAlign: 'center', padding: '10px 0' }}>
                    Change Your Password
                </h2>
                <UFrom
                    onSubmit={onSubmit}
                    resolver={zodResolver(changePasswordSchema)}
                >
                    <UInputPassword
                        name="oldPassword"
                        label="Old Password"
                        placeholder="Old Password"
                        showLabel
                        hideIcon
                    />
                    <UInputPassword
                        name="newPassword"
                        label="New Password"
                        placeholder="New Password"
                        showLabel
                        hideIcon
                    />
                    <Button block type="primary" htmlType="submit">
                        Change Password
                    </Button>
                </UFrom>
            </Col>
        </Flex>
    );
};

export default ChangePassword;
