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
                <h2 style={{ textAlign: 'center', padding: '10px 0 24px 0' }}>
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
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        style={{ marginTop: 8, marginBottom: 8 }}
                    >
                        Change Password
                    </Button>
                </UFrom>
            </Col>
        </Flex>
    );
};

export default ChangePassword;
