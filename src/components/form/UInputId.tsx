import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { UserOutlined } from '@ant-design/icons';
import UFromError from './UFromError';

const UInputId = () => {
    return (
        <div style={{ margin: '12px 0' }}>
            <Controller
                name="id"
                render={({ field, fieldState: { error } }) => (
                    <Form.Item style={{ margin: 0 }}>
                        <Input
                            {...field}
                            type="text"
                            id="id"
                            prefix={<UserOutlined />}
                            status={error ? 'error' : ''}
                            placeholder="ID"
                        />
                        <UFromError error={error} />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default UInputId;
