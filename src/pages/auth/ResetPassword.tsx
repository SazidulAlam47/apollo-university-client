import { useResetPasswordMutation } from '../../redux/features/auth/auth.api';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { TResponse } from '../../types';
import { Button, Col, Flex } from 'antd';
import UFrom from '../../components/form/UFrom';
import { resetPasswordSchema } from '../../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import UInputPassword from '../../components/form/UInputPassword';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const ResetPassword = () => {
    const [resetPassword] = useResetPasswordMutation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const id = searchParams.get('id');
    const token = searchParams.get('token');

    useEffect(() => {
        if (!id || !token) {
            navigate('/login');
        }
    }, [id, token, navigate]);

    const onSubmit = async (data: FieldValues) => {
        const resetPasswordData = {
            token,
            data: {
                id,
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
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        style={{ marginTop: 8, marginBottom: 8 }}
                    >
                        Submit
                    </Button>
                </UFrom>
            </Col>
        </Flex>
    );
};

export default ResetPassword;
