const productionLogger = require('./logger');

let logger = null;
logger = productionLogger();

// if (process.env.NODE_ENV === 'production') {
// }

module.exports = logger;
