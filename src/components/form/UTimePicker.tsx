import { Form, TimePicker } from 'antd';
import { Controller } from 'react-hook-form';
import UFromError from './UFromError';

type UInputProps = {
    placeholder?: [string, string];
    name: string;
    label?: string;
    disabled?: boolean;
};

const UTimePicker = ({
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
                        <TimePicker.RangePicker
                            {...field}
                            id={name}
                            status={error ? 'error' : ''}
                            placeholder={placeholder ? placeholder : ['', '']}
                            disabled={disabled}
                            format="HH:mm"
                            style={{ width: '100%' }}
                        />
                        <UFromError error={error} />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default UTimePicker;
