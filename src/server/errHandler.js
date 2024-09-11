const errorHandler = (fn) => (req, res) => {
    Promise.resolve(fn(req, res)).catch(() => {
        throw new Error('An error occurred');
    });
}

export { errorHandler }