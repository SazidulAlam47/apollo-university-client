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
            }}
        >
            <Col span={5}>
                <h2 style={{ textAlign: 'center', padding: '10px 0' }}>
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

                    <Button block type="primary" htmlType="submit">
                        Send Email
                    </Button>
                </UFrom>
            </Col>
        </Flex>
    );
};

export default ForgotPassword;
