import { Button, Form, Upload, UploadFile, UploadProps } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import UFromError from './UFromError';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

const UPictureInput = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [fileError, setFileError] = useState('');
    const { watch } = useFormContext();

    const props: UploadProps = {
        onRemove: () => {
            setFileList([]);
            setFileError('');
        },
        beforeUpload: (file) => {
            setFileError('');

            const isPNG =
                file.type === 'image/png' || file.type === 'image/jpeg';
            if (!isPNG) {
                setFileError('Please select a jpg or png file');
                setFileList([]);
            } else {
                setFileList([file]);
            }
            return false;
        },
        fileList,
    };

    const formValues = watch('image');

    useEffect(() => {
        if (!formValues) {
            setFileList([]);
            setFileError('');
        }
    }, [formValues]);

    return (
        <div style={{ margin: '12px 0' }}>
            <Controller
                name="image"
                render={({
                    field: { onChange, ...field },
                    fieldState: { error },
                }) => (
                    <Form.Item label="Picture" style={{ margin: 0 }}>
                        <Upload
                            {...props}
                            {...field}
                            id="image"
                            onChange={() => {
                                if (fileList[0]?.status !== 'removed') {
                                    onChange(fileList[0]);
                                } else {
                                    onChange(undefined);
                                }
                            }}
                        >
                            <Button icon={<UploadOutlined />}>
                                Select Picture
                            </Button>
                        </Upload>
                        <UFromError error={error} />
                        {fileError && (
                            <p style={{ color: '#ff4d4f', marginTop: '3px' }}>
                                {fileError}
                            </p>
                        )}
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default UPictureInput;
