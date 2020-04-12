const logger = require('./logger');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  logger.logError(err);

  if (res) {
    const { statusCode, message } = err;

    res.status(err.statusCode || 500).json({
      status: 'error',
      statusCode,
      message
    });
  }
};

module.exports = {
  ErrorHandler,
  handleError
};
