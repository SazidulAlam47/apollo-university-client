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
};

type UFromProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const UFrom = ({ children, onSubmit, defaultValues }: UFromProps) => {
    const formConfig: TFormConfig = {};

    if (defaultValues) {
        formConfig.defaultValues = defaultValues;
    }

    const methods = useForm(formConfig);

    return (
        <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(onSubmit)} layout="vertical">
                {children}
            </Form>
        </FormProvider>
    );
};

export default UFrom;
