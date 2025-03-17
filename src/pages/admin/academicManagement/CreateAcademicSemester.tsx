import { Button, Col, Flex } from 'antd';
import UFrom from '../../../components/form/UFrom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import USelect from '../../../components/form/USelect';
import { nameOptions, yearOptions } from '../../../constants/semester';
import { monthsOptions } from '../../../constants/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';

const CreateAcademicSemester = () => {
    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        const name = nameOptions[Number(data.name) - 1]?.label;
        const submitData = {
            ...data,
            name,
            code: data.name,
        };
        console.log(submitData);
    };

    return (
        <Flex justify="center">
            <Col span={10}>
                <UFrom
                    onSubmit={handleSubmit}
                    resolver={zodResolver(academicSemesterSchema)}
                >
                    <USelect
                        name="name"
                        placeholder="Select Name"
                        label="Name"
                        options={nameOptions}
                    />
                    <USelect
                        name="year"
                        placeholder="Select Year"
                        label="Year"
                        options={yearOptions}
                    />
                    <USelect
                        name="startMonth"
                        placeholder="Select Start Month"
                        label="Start Month"
                        options={monthsOptions}
                    />
                    <USelect
                        name="endMonth"
                        placeholder="Select End Month"
                        label="End Month"
                        options={monthsOptions}
                    />

                    <Button htmlType="submit">Submit</Button>
                </UFrom>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;
