import { Form, InputNumber } from 'antd';
import { Controller } from 'react-hook-form';
import UFromError from './UFromError';

type UInputNumberProps = {
    placeholder?: string;
    name: string;
    label?: string;
    disabled?: boolean;
    min: number;
    max: number;
};

const UInputNumber = ({
    placeholder,
    name,
    label,
    disabled = false,
    min,
    max,
}: UInputNumberProps) => {
    return (
        <div style={{ margin: '12px 0' }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label} style={{ margin: 0 }}>
                        <InputNumber
                            {...field}
                            min={min}
                            max={max}
                            id={name}
                            status={error ? 'error' : ''}
                            placeholder={placeholder ? placeholder : ''}
                            disabled={disabled}
                            style={{ width: '100%' }}
                        />
                        <UFromError error={error} />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default UInputNumber;
