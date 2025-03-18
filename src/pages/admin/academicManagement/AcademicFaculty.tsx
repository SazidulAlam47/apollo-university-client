import { Table, TableColumnsType } from 'antd';
import { Key } from 'react';
import { useGetAllAcademicFacultiesQuery } from '../../../redux/features/admin/academicManagement/academicManagementApi';
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
    const {
        data: academicFacultiesData,
        isLoading,
        isFetching,
    } = useGetAllAcademicFacultiesQuery(undefined);

    if (isLoading) {
        return <Loader />;
    }

    const tableData = academicFacultiesData!.data?.map(
        ({ _id, name }: { _id: string; name: string }) => ({
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
            />
        </>
    );
};

export default AcademicFaculty;
