const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info(`Method: ${ req.method }`);
    logger.info(`Path: ${ req.path }`);
    logger.info(`Body: ${ req.body }`);
    logger.info('---');
    next();
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' });
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'Malformatted ID' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    next(error);
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        req.token = authorization.substring(7);
    }

    next();
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
}