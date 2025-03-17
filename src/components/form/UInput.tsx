import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

type UInputProps = {
    type: string;
    placeholder?: string;
    name: string;
    label?: string;
    rules?: Record<string, unknown>;
};

const UInput = ({ type, placeholder, name, rules, label }: UInputProps) => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <div style={{ margin: '12px 0' }}>
            <Controller
                rules={rules ? rules : {}}
                name={name}
                render={({ field }) => {
                    if (type === 'password') {
                        return (
                            <Input.Password
                                {...field}
                                type={type}
                                id={name}
                                status={errors[name] ? 'error' : ''}
                                prefix={<LockOutlined />}
                                placeholder={placeholder ? placeholder : ''}
                            />
                        );
                    }
                    if (name === 'id') {
                        return (
                            <Input
                                {...field}
                                type={type}
                                id={name}
                                status={errors[name] ? 'error' : ''}
                                prefix={<UserOutlined />}
                                placeholder={placeholder ? placeholder : ''}
                            />
                        );
                    }
                    return (
                        <Form.Item label={label} style={{ margin: 0 }}>
                            <Input
                                {...field}
                                type={type}
                                id={name}
                                status={errors[name] ? 'error' : ''}
                                placeholder={placeholder ? placeholder : ''}
                            />
                        </Form.Item>
                    );
                }}
            />

            {errors[name] && (
                <p style={{ color: '#ff4d4f' }}>
                    {errors[name]?.message as string}
                </p>
            )}
        </div>
    );
};

export default UInput;
