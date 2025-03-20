import { useParams } from 'react-router-dom';

const StudentDetails = () => {
    const { id } = useParams();
    return (
        <div>
            <p>This is StudentDetails {id}</p>
        </div>
    );
};

export default StudentDetails;
