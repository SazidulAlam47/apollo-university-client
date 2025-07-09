import { useForgotPasswordMutation } from '../../redux/features/auth/auth.api';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { TResponse } from '../../types';
import { Button, Col, Flex } from 'antd';
import UFrom from '../../components/form/UFrom';
import { forgotPasswordSchema } from '../../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import UInput from '../../components/form/UInput';

const ForgotPassword = () => {
    const [forgotPassword] = useForgotPasswordMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Sending...');
        const res = (await forgotPassword(data)) as TResponse<null>;
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
                    Forgot Password
                </h2>
                <UFrom
                    onSubmit={onSubmit}
                    resolver={zodResolver(forgotPasswordSchema)}
                >
                    <UInput
                        name="id"
                        label="Your ID"
                        placeholder="Enter your ID"
                    />
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        style={{ marginTop: 8, marginBottom: 8 }}
                    >
                        Send Email
                    </Button>
                </UFrom>
            </Col>
        </Flex>
    );
};

export default ForgotPassword;
