// notFound -> send 404 if no route matched
const notFound = (req, res, next) => {
    res.status(404);
    next(new Error(`Not Found - ${req.originalUrl}`));
  };
  
  // centralized error handler
  // eslint-disable-next-line no-unused-vars
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
      message: err.message || "Server Error",
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
  };
  
  module.exports = { notFound, errorHandler };
  