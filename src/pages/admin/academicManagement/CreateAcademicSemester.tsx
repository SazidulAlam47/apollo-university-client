import { Button, Col, Flex } from 'antd';
import UFrom from '../../../components/form/UFrom';
import UInput from '../../../components/form/UInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const CreateAcademicSemester = () => {
    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <Flex justify="center">
            <Col span={10}>
                <UFrom onSubmit={handleSubmit}>
                    <UInput
                        type="text"
                        name="name"
                        placeholder="Name"
                        label="Name"
                        rules={{ required: 'Name is required' }}
                    />
                    <UInput
                        type="text"
                        name="message"
                        placeholder="Message"
                        label="Message"
                        rules={{ required: 'Message is required' }}
                    />
                    <Button htmlType="submit">Submit</Button>
                </UFrom>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;
