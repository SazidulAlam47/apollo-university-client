/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from 'antd';
import { ReactNode } from 'react';
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from 'react-hook-form';

type TFormConfig = {
    defaultValues?: Record<string, unknown>;
    resolver?: any;
};

type UFromProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
    reset?: boolean;
} & TFormConfig;

const UFrom = ({
    children,
    onSubmit,
    defaultValues,
    resolver,
    reset = false,
}: UFromProps) => {
    const formConfig: TFormConfig = {};

    if (defaultValues) {
        formConfig.defaultValues = defaultValues;
    }
    if (resolver) {
        formConfig.resolver = resolver;
    }

    const methods = useForm(formConfig);

    const submit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
        if (reset) {
            methods.reset();
        }
    };

    return (
        <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(submit)} layout="vertical">
                {children}
            </Form>
        </FormProvider>
    );
};

export default UFrom;
