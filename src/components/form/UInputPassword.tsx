import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { LockOutlined } from '@ant-design/icons';
import UFromError from './UFromError';

type TInputPasswordProps = {
    showLabel?: boolean;
};

const UInputPassword = ({ showLabel = false }: TInputPasswordProps) => {
    return (
        <div style={{ margin: '12px 0' }}>
            <Controller
                name="password"
                render={({ field, fieldState: { error } }) => (
                    <Form.Item
                        style={{ margin: 0 }}
                        label={showLabel ? 'Password' : ''}
                    >
                        <Input.Password
                            {...field}
                            type="password"
                            id="password"
                            prefix={<LockOutlined />}
                            status={error ? 'error' : ''}
                            placeholder="Password"
                        />
                        <UFromError error={error} />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default UInputPassword;
