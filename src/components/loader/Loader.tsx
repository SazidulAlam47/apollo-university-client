import { Flex } from 'antd';
import { RingLoader } from 'react-spinners';

const Loader = () => {
    return (
        <Flex justify="center" align="center" style={{ height: '85vh' }}>
            <RingLoader
                color="#001529"
                size={100}
                aria-label="Loading..."
                data-testid="loader"
            />
        </Flex>
    );
};

export default Loader;
