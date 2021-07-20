const { defineLogger } = require('../config/logging');
const NAMESPACE = 'LOGGING_MIDDLEWARE';
const logger = defineLogger(NAMESPACE);

function loggingMiddleWare(req, res, next) {
  if (req.url.startsWith('/admin')) {
    return next();
  }
  /** Log the req */
  logger.info(
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on('finish', () => {
    /** Log the res */
    logger.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
}

module.exports = loggingMiddleWare;
