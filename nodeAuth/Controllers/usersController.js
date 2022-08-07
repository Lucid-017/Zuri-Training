// first things first import user model from models
const User = require('../Models/UserModel')
const {validationResult} =require('express-validator')//used to validate request in from our client side
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { findById } = require('../Models/UserModel')
require('dotenv').config()
const {SECRET}= process.env;


exports.loggedInUser= async (req,res)=>{
    // get user info from database
    try {
        const user = await findById(req.user.id).select('-password')//.select -Specifies which document fields to include or exclude (also known as the query "projection")
        // return user
        res.json(200).json({message:"user logged in"},user)
    } catch (err) {
        console.error(err.message)
        res.json(500).json({message:"server error"})
        
    }
}
// @Route  POST api/auth/login
// @desc   authenticate the user(admin,manager,staff) and get token
// @access public route
exports.userLogin = async (req,res)=>{//takes in the req and response
// check for possible errors
    const errors = validationResult(req)//validating request
    // if error is not empty
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
        // else
        // destructure request body
        const {email,password}= req.body
        try {
            // find one user where the email matches the email in our database
            let user = await User.findOne({email})
            // if user doesn't exist
            if(!user) return res.status(400).json({statusCode:400,message:"invalid credentials"})
            // check password
            const isMatch = await bcrypt.compare(password,user.password)
            // if it doesnt match
            if(!isMatch)
            return res.status(400).json({statusCode:400,message:"invalid credentials"})
            // if it does match,send token
            // send payload and signed token
            const payload={
                user:{
                    id:user.id
                }
            }
            /**
            REVIEW
            To create the signature part you have to take the encoded header,
            the encoded payload, a secret, the "algorithm specified in the header", and sign that. */
            jwt.sign(payload,SECRET,{expiresIn:360000 /*4 days*/ },(err,token)=>{
                if(err) throw err;
                res.json(
                    {statusCode:200,message:"logged in sucessfully",
                    user:{
                        firstName:  user.firstName,
                        lastName:   user.lastName,
                        email:      user.email,
                        userRoles:  user.userRoles,
                        isAdmin:    user.isAdmin,
                        isManager:  user.isManager
                    },
                    token
                })
                
            })//jwt.sign()- Synchronously sign the given payload into a JSON Web Token string payload -
            // Payload to sign, could be an literal, buffer or string 
            // secretOrPrivateKey - Either the secret for HMAC algorithms,
            //  or the PEM encoded private key
        } catch (error) {
            console.err(error.message);
            return res.status(500).json({message:"server error"})
        }
    
}