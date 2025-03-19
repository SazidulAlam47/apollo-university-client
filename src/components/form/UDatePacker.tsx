import { DatePicker, Form } from 'antd';
import { Controller } from 'react-hook-form';
import UFromError from './UFromError';

type UDatePackerProps = {
    placeholder?: string;
    name: string;
    label?: string;
};

const UDatePacker = ({ placeholder, name, label }: UDatePackerProps) => {
    return (
        <div style={{ margin: '12px 0' }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label} style={{ margin: 0 }}>
                        <DatePicker
                            {...field}
                            id={name}
                            status={error ? 'error' : ''}
                            placeholder={placeholder ? placeholder : ''}
                            style={{ width: '100%' }}
                            format={{
                                format: 'DD-MM-YYYY',
                                type: 'mask',
                            }}
                        />
                        <UFromError error={error} />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default UDatePacker;
