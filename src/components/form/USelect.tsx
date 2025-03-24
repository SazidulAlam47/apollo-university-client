import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';
import UFromError from './UFromError';

type TOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

type USelectProps = {
    placeholder?: string;
    name: string;
    label?: string;
    options: TOption[] | undefined;
    disabled?: boolean;
    mode?: 'multiple' | 'tags' | undefined;
};

const USelect = ({
    placeholder,
    name,
    label,
    options,
    disabled = false,
    mode,
}: USelectProps) => {
    return (
        <div style={{ margin: '12px 0' }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => {
                    return (
                        <Form.Item label={label} style={{ margin: 0 }}>
                            <Select
                                {...field}
                                mode={mode}
                                status={error ? 'error' : ''}
                                style={{ width: '100%' }}
                                placeholder={placeholder}
                                options={options}
                                disabled={disabled}
                            />
                            <UFromError error={error} />
                        </Form.Item>
                    );
                }}
            />
        </div>
    );
};

export default USelect;
