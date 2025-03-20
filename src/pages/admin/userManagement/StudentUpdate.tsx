import { useParams } from 'react-router-dom';

const StudentUpdate = () => {
    const { id } = useParams();
    return (
        <div>
            <p>This is StudentUpdate {id}</p>
        </div>
    );
};

export default StudentUpdate;
