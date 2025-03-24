import { Button, Pagination, Table, TableColumnsType } from 'antd';
import { Key, useState } from 'react';
import { TCourse, TMeta } from '../../../types';
import Loader from '../../../components/loader/Loader';
import { useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement/courses.api';
import { Link } from 'react-router-dom';

type TTableData = {
    key: Key;
    name: string;
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
        render: (_, record) => {
            return (
                <Link to={`/admin/course-update/${record.key}`}>
                    <Button>Update</Button>
                </Link>
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

export default CoursesData;
