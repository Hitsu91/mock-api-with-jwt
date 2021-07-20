const logTrace = { info: [], warn: [], error: [], debug: [] };

const createLogMsg = (namespace, type, message) =>
  `[${getTimeStamp()}] [${type.toUpperCase()}] [${namespace}] ${message}`;
const maxLogLength = 10;
const traceLog = (type, logMsg) => {
  let logArray = logTrace[type];
  if (!logArray) return;
  if (logArray.length > maxLogLength) {
    logArray.splice(0, 1);
  }
  logArray.push(logMsg);
};

const info = (namespace) => (message) => {
  const type = 'info';
  const logMsg = createLogMsg(namespace, type, message);
  console.info(logMsg);
  traceLog(type, logMsg);
};

const warn = (namespace) => (message) => {
  const type = 'warn';
  const logMsg = createLogMsg(namespace, type, message);
  console.warn(logMsg);
  traceLog(type, logMsg);
};

const error = (namespace) => (message) => {
  const type = 'error';
  const logMsg = createLogMsg(namespace, type, message);
  console.error(logMsg);
  traceLog(type, logMsg);
};

const debug = (namespace) => (message) => {
  const type = 'debug';
  const logMsg = createLogMsg(namespace, type, message);
  console.debug(logMsg);
  traceLog(type, logMsg);
};

const getTimeStamp = () => new Date().toISOString();

const defineLogger = (namespace) => {
  return {
    info: info(namespace),
    warn: warn(namespace),
    error: error(namespace),
    debug: debug(namespace),
  };
};

const getLogTrace = (namespace) => {
  return logTrace;
};

module.exports = { defineLogger, getLogTrace };
