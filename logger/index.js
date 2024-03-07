const productionLogger = require('./logger');

let logger = null;

if (process.env.NODE_ENV === 'production') {
  logger = productionLogger();
}

module.exports = logger;
