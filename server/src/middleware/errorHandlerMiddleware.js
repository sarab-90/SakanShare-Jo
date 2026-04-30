export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        status: err.status || "error",
        message: err.message || 'Internal Server Error',
    });
};
