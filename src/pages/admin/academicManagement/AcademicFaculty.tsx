import { Pagination, Table, TableColumnsType } from 'antd';
import { Key, useState } from 'react';
import { useGetAllAcademicFacultiesQuery } from '../../../redux/features/admin/academicManagement/academicManagement.api';
import { TAcademicFaculty, TMeta } from '../../../types';
import Loader from '../../../components/loader/Loader';

type TTableData = {
    key: Key;
    name: string;
};

const columns: TableColumnsType<TTableData> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
];

const AcademicFaculty = () => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const {
        data: academicFacultiesData,
        isFetching,
        isLoading,
    } = useGetAllAcademicFacultiesQuery([
        { name: 'page', value: page },
        { name: 'limit', value: limit },
    ]);

    if (isLoading) {
        return <Loader />;
    }

    const meta = academicFacultiesData.meta as TMeta;

    const tableData = academicFacultiesData?.data?.map(
        ({ _id, name }: TAcademicFaculty) => ({
            key: _id,
            name,
        }),
    );

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>
                Academic Semesters
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

export default AcademicFaculty;
