import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { LockOutlined } from '@ant-design/icons';
import UFromError from './UFromError';

type TInputPasswordProps = {
    showLabel?: boolean;
    name?: string;
    placeholder?: string;
    label?: string;
    hideIcon?: boolean;
};

const UInputPassword = ({
    showLabel = false,
    name = 'password',
    placeholder = 'Password',
    label = 'Password',
    hideIcon = false,
}: TInputPasswordProps) => {
    return (
        <div style={{ margin: '12px 0' }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item
                        style={{ margin: 0 }}
                        label={showLabel ? label : ''}
                    >
                        <Input.Password
                            {...field}
                            type="password"
                            id={name}
                            prefix={hideIcon ? undefined : <LockOutlined />}
                            status={error ? 'error' : ''}
                            placeholder={placeholder}
                        />
                        <UFromError error={error} />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default UInputPassword;
