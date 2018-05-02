const setupMockCtx = () => {
    const mock = {
        fillStyle: 'lightGrey',
        fillRect: jest.fn(),
        fillText:jest.fn(),
        strokeRect: jest.fn()
    };

    return mock;
};

export default setupMockCtx;