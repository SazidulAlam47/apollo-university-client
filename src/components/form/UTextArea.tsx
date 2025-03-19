import { Form } from 'antd';
import { Controller } from 'react-hook-form';
import UFromError from './UFromError';
import TextArea from 'antd/es/input/TextArea';

type UTextAreaProps = {
    placeholder?: string;
    name: string;
    label?: string;
    row?: number;
};

const UTextArea = ({ placeholder, name, label, row = 3 }: UTextAreaProps) => {
    return (
        <div style={{ margin: '12px 0' }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label} style={{ margin: 0 }}>
                        <TextArea
                            {...field}
                            id={name}
                            status={error ? 'error' : ''}
                            placeholder={placeholder ? placeholder : ''}
                            rows={row}
                        />
                        <UFromError error={error} />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default UTextArea;
