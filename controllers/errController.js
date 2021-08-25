const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);
  const message = `Dupicate Field Value:${value}. Please Use another Value`;
  return new AppError(message, 400);
};

const handleValidationDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input Data.${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid Token.Please Log in again', 401);

const handleJWTExpireError = (err) =>
  new AppError('Your token has expired! Please Login Again', 401);

const sendErrDev = (err, req, res) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //B) RENDERD WEBSITE
  console.error('Error 🎇', err);
  return res.status(err.statusCode).render('error', {
    title: 'something went wrong!',
    msg: err.message,
  });
};
const sendErrProd = (err, req, res) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    //A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Proogramming or other unknown error: dont leak error details
    // 1) Log Error
    console.error('Error 🎇', err);

    // 2) send Generic Message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  // B) RENDER WEBSITE
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'something went wrong!',
      msg: err.message,
    });
  }
  //Proogramming or other unknown error: dont leak error details
  //1) Log Error
  console.error('Error 🎇', err);

  //2) send Generic Message
  return res.status(err.statusCode).render('error', {
    title: 'something went wrong!',
    msg: 'Please Try Again Later',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;
    error.message = err.message;
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError') error = handleJWTExpireError(error);
    sendErrProd(error, req, res);
  }
};
