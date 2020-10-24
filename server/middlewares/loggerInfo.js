const logger = require('../configuration/winston');

module.exports = (req,res,next) => {
    logger.info(`Requesting API: URL ${req.url}`);
    next();
}