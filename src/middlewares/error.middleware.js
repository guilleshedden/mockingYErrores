const { Error } = require("../utils/customError/Errors");
const { logger } = require("../utils/logger")

exports.errorHandler = (error, req, res, next) =>{
    logger.error(error.cause)
    switch (error.code) {
        case Error.INVALID_TYPE_ERROR:
            return res.send({status: "error", error: error.name})
            break;
    
        default:
            return res.send({status: "error", error: "unhandled error"})
            break;
    }
}