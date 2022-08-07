/**
when a user logs in a token is genegrated, an encrypted format of your login details
if your sign in info then matches those of you info i the token, then you are authenticated otherwise
invalid credentials */

// so now'll cheeck if there's a token and header we can access
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {SECRETS} =process.env;

// export middleware
module.exports = (req,res,next)=>{
    // get token from header
    const token = req.header('x-auth-token')

    if(!token) return res.status(401).json({statusCode:401,message:'No token, no Authoriztion'})
    // 401 stands for unauthorized request

    // else if token exist
    try {
        const decoded =jwt.verify(token,SECRETS)//takes in the token and a secret,Synchronously verify given token using a secret or a public key to get a decoded token
        // assign user to request object
        req.user = decoded.user
        // call the next middleware
        next()
    } catch (error) {
        return res.status(401).json(
            {
            statusCode:401,
            message:'Bad Token'
            })
    }

}
