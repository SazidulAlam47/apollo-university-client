import { Form, Select } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import UFromError from './UFromError';
import {
    Dispatch,
    RefObject,
    SetStateAction,
    useEffect,
    useImperativeHandle,
} from 'react';

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
    setSelectValue: Dispatch<SetStateAction<string>>;
    fncRef?: RefObject<unknown>;
};

const USelectWatch = ({
    placeholder,
    name,
    label,
    options,
    setSelectValue,
    disabled = false,
    mode = undefined,
    fncRef = undefined,
}: USelectProps) => {
    const { watch, setValue } = useFormContext();
    const fromValue = watch(name);
    useEffect(() => {
        setSelectValue(fromValue);
    }, [fromValue, setSelectValue]);

    const resetField = () => {
        setValue(name, undefined);
    };

    useImperativeHandle(fncRef, () => ({
        resetField,
    }));

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

export default USelectWatch;
