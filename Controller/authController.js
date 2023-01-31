
const {StatusCodes} = require('http-status-codes');
const User = require('../Module/user');
const customError = require('../Error')

const register = async (req, res, next) => {
 
    const{firstName, lastName,email,password} = req.body
    const user = new User({firstName, lastName, email, password})
    await user.save();
    const token = await user.generateJWT();
    res.status(StatusCodes.OK).json({msg:'Account Created Successfully',token})
   
  
};
const login = async (req, res, next) => {
    const{email, password} = req.body;
    if (!email || !password) throw new customError.BadrequestError('provide email and password');
    const user = await User.findOne({email:email})

    if (!user) throw new customError.UnauthenticatedError('Invalid email or password');
    //compare password
    const isPasswordCorrect = await user.comparePassword(password,user.password);
    if(!isPasswordCorrect) throw new customError.UnauthenticatedError('Invalid password') ;

    //generate token
    const token = await user.generateJWT();
    res.status(StatusCodes.OK).json({user:{name:user.lastName,role:user.role,email:user.email},token});
}

module.exports ={
    register,
    login
}
