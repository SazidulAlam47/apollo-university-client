import { Flex, Spin } from 'antd';

const Loader = () => {
    return (
        <Flex justify="center" align="center" style={{ height: '85vh' }}>
            <Spin size="large" />
        </Flex>
    );
};

export default Loader;
