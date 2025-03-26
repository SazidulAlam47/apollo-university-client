import { Button, Flex, Modal, Pagination, Table, TableColumnsType } from 'antd';
import { Key, useRef, useState } from 'react';
import { TCourse, TFaculty, TMeta, TResponse } from '../../../types';
import Loader from '../../../components/loader/Loader';
import {
    useAssignCourseFacultiesMutation,
    useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagement/courses.api';
import { Link } from 'react-router-dom';
import USelect from '../../../components/form/USelect';
import UFrom, { TUFromFncRef } from '../../../components/form/UFrom';
import { zodResolver } from '@hookform/resolvers/zod';
import { assignCourseFacultiesSchema } from '../../../schemas/courseManagement.schema';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement/facultyManagement.api';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

type TTableData = {
    key: Key;
    title: string;
    prefix: string;
    code: number;
};

const columns: TableColumnsType<TTableData> = [
    {
        title: 'Course Title',
        dataIndex: 'title',
    },
    {
        title: 'Course Prefix',
        dataIndex: 'prefix',
    },
    {
        title: 'Course code',
        dataIndex: 'code',
    },
    {
        title: 'Action',
        width: '10%',
        render: (_, record) => {
            return (
                <Flex gap={10}>
                    <Link to={`/admin/course-update/${record.key}`}>
                        <Button>Update</Button>
                    </Link>
                    <AssignModal courseInfo={record} />
                </Flex>
            );
        },
    },
];

const CoursesData = () => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const {
        data: coursesData,
        isFetching,
        isLoading,
    } = useGetAllCoursesQuery([
        { name: 'page', value: page },
        { name: 'limit', value: limit },
    ]);

    if (isLoading) {
        return <Loader />;
    }

    const meta = coursesData.meta as TMeta;

    const tableData = coursesData?.data?.map(
        ({ _id, title, prefix, code }: TCourse) => ({
            key: _id,
            title,
            prefix,
            code,
        }),
    );

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                All Courses
            </h2>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                showSorterTooltip={{ target: 'sorter-icon' }}
                pagination={false}
            />
            <Pagination
                align="end"
                total={meta.totalData}
                pageSize={limit}
                current={page}
                onChange={setPage}
                style={{ margin: '10px 0' }}
                showSizeChanger
                pageSizeOptions={[3, 5, 10, 15, 20]}
                onShowSizeChange={(_page, limit) => setLimit(limit)}
            />
        </>
    );
};

const AssignModal = ({ courseInfo }: { courseInfo: TTableData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fromResetRef = useRef<TUFromFncRef>(undefined);

    const { data: facultiesData, isFetching: isFacultiesFetching } =
        useGetAllFacultiesQuery([]);

    const facultiesOption = facultiesData?.data.map((item: TFaculty) => ({
        value: item._id,
        label: item.fullName,
    }));

    const [assignCourseFaculties] = useAssignCourseFacultiesMutation();

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const courseFacultiesData = {
            courseId: courseInfo.key,
            data: {
                faculties: data.faculties,
            },
        };

        const toastId = toast.loading('Assigning...');
        const res = (await assignCourseFaculties(
            courseFacultiesData,
        )) as TResponse<null>;
        if (res.data) {
            toast.success(res.data.message, { id: toastId });
            setIsModalOpen(false);
            fromResetRef?.current?.resetFrom();
        } else if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>Assign Faculties</Button>
            <Modal
                title={`Assign Faculties to ${courseInfo.title}`}
                open={isModalOpen}
                footer={false}
                onCancel={handleCancel}
            >
                <UFrom
                    onSubmit={handleSubmit}
                    resolver={zodResolver(assignCourseFacultiesSchema)}
                    fncRef={fromResetRef}
                >
                    <USelect
                        mode="multiple"
                        name="faculties"
                        label="Faculties"
                        placeholder="Select Faculties"
                        disabled={isFacultiesFetching}
                        options={facultiesOption}
                    />
                    <Button htmlType="submit">Assign</Button>
                </UFrom>
            </Modal>
        </>
    );
};

export default CoursesData;
