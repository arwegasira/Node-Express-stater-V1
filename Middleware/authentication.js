
const customError = require('../Error');
const jwt = require('jsonwebtoken');
const authenticationMiddleware = async(req, res, next)=>{

    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')) throw new customError.UnauthenticatedError('Not authenticated')

    const token = authHeader.split(' ')[1]  ;

    try {
        const paylod = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId:paylod.userId,name:paylod.name,email:paylod.email,role:paylod.role};
        next()
    } catch (error) {
        throw new customError.UnauthenticatedError('not authenticated')
        
    }

    
   

    


}

module.exports = authenticationMiddleware;