import { useResetPasswordMutation } from '../../redux/features/auth/auth.api';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { TResponse } from '../../types';
import { Button, Col, Flex } from 'antd';
import UFrom from '../../components/form/UFrom';
import { resetPasswordSchema } from '../../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import UInputPassword from '../../components/form/UInputPassword';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const [resetPassword] = useResetPasswordMutation();
    const [searchParams] = useSearchParams();

    const onSubmit = async (data: FieldValues) => {
        const resetPasswordData = {
            token: searchParams.get('token'),
            data: {
                id: searchParams.get('id'),
                password: data.password,
            },
        };
        const toastId = toast.loading('Sending...');
        const res = (await resetPassword(resetPasswordData)) as TResponse<null>;
        if (res.data) {
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
                <h2 style={{ textAlign: 'center', padding: '10px 0' }}>
                    Reset Password
                </h2>
                <UFrom
                    onSubmit={onSubmit}
                    resolver={zodResolver(resetPasswordSchema)}
                >
                    <UInputPassword
                        name="password"
                        label="New Password"
                        placeholder="New Password"
                        showLabel
                        hideIcon
                    />
                    <UInputPassword
                        name="confirmPassword"
                        label="Confirm New Password"
                        placeholder="Confirm New Password"
                        showLabel
                        hideIcon
                    />
                    <Button block type="primary" htmlType="submit">
                        Submit
                    </Button>
                </UFrom>
            </Col>
        </Flex>
    );
};

export default ResetPassword;
