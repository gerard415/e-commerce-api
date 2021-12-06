const jwt = require('jsonwebtoken')

const {UnauthenticatedError} = require('../errors')

const authenticationMiddleware = async (req, res, next)=>{
    const authHead = req.headers.authorization

    if(!authHead || !authHead.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token provided')
    }

    const token = authHead.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.jwt_secret)
        //const user = User.findbyId(payload.id).select('-password')
        //req.user = user

        req.user = { userId: payload.userId, name: payload.username }
        next()
    } catch (error) {
        throw new UnauthenticatedError('You are not authourized to access this page')
    }
}

module.exports = authenticationMiddleware

//to use the authentication middleware, you can import it into your routes and put it infront of each of the routes.
//if you want all your routes to have the same authentication middleware then you could import it inside the app.js and put it infront of the route