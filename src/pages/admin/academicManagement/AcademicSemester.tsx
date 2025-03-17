import { useGetAllAcademicSemestersQuery } from '../../../redux/features/academicSemester/academicSemesterApi';

const AcademicSemester = () => {
    const { data, error } = useGetAllAcademicSemestersQuery(undefined);

    console.log({ data, error });

    return (
        <div>
            <p>This is academicSemester</p>
        </div>
    );
};

export default AcademicSemester;
