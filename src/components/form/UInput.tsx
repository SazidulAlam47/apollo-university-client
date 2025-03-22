import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import UFromError from './UFromError';

type UInputProps = {
    type?: string;
    placeholder?: string;
    name: string;
    label?: string;
    disabled?: boolean;
};

const UInput = ({
    type = 'text',
    placeholder,
    name,
    label,
    disabled = false,
}: UInputProps) => {
    return (
        <div style={{ margin: '12px 0' }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label} style={{ margin: 0 }}>
                        <Input
                            {...field}
                            type={type}
                            id={name}
                            status={error ? 'error' : ''}
                            placeholder={placeholder ? placeholder : ''}
                            disabled={disabled}
                        />
                        <UFromError error={error} />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default UInput;
