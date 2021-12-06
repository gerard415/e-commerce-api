const {BadRequestError, UnauthenticatedError} = require('../errors')
const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')


const register = async (req, res)=>{
    const user = await User.create({...req.body})
    const token = user.createJwt()
    res.status(StatusCodes.CREATED).json({user: {username:user.username}, token})
}

const login = async (req, res)=>{
    const {username, password} = req.body
    //checking if both the email and password are provided
    if(!username || !password){
        throw new BadRequestError('please provide a username and password')
    }
    //finding a user with the email, if the user doesnt exist, return an error
    const user = await User.findOne({username})
    if(!user){
        throw new UnauthenticatedError('Invalid email or password')
    } 
    //using the comparePassword function in the User.js model to compare the passwords
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        throw new UnauthenticatedError('Invalid email or password')
    }
    const token = user.createJwt()
    res.status(StatusCodes.OK).json({user: {username:user.username}, token})
}

module.exports = {
    register, login
}