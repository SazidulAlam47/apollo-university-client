/* eslint-disable @typescript-eslint/no-explicit-any */
const UFromError = ({ error }: { error: any }) => {
    return (
        <>
            {error && (
                <p style={{ color: '#ff4d4f', marginTop: '3px' }}>
                    {error?.message as string}
                </p>
            )}
        </>
    );
};

export default UFromError;
