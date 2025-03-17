import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

type UInputProps = {
    type: string;
    placeholder: string;
    name: string;
};

const UInput = ({ type, placeholder, name }: UInputProps) => {
    const {
        formState: { errors },
    } = useFormContext();

    // console.log('errors', errors);

    return (
        <div style={{ margin: '12px 0' }}>
            <Controller
                name={name}
                render={({ field }) => {
                    if (type === 'password') {
                        return (
                            <Input.Password
                                {...field}
                                prefix={<LockOutlined />}
                                type={type}
                                placeholder={placeholder}
                            />
                        );
                    }
                    if (name === 'id') {
                        return (
                            <Input
                                {...field}
                                prefix={<UserOutlined />}
                                type={type}
                                placeholder={placeholder}
                            />
                        );
                    }
                    return (
                        <Input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                        />
                    );
                }}
            />

            {errors[name] && (
                <p style={{ color: 'red', paddingTop: '10px' }}>
                    {errors[name]?.message as string}
                </p>
            )}
        </div>
    );
};

export default UInput;
