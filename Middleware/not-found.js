
const {StatusCodes} = require('http-status-codes');
const notFound = (req,res,next) => {
 res.status(StatusCodes.BAD_REQUEST).json({msg:'Ressource not found'})
}

module.exports = notFound;