const express =require('express')
// access the router function in express
const Router =express.Router()
const userController= require('../Controllers/usersController')
const {check}=require('express-validator')
const auth = require('../middleware/auth')

// login UserRoute
// run a check on this request to check if some inputs are valid
Router.post('/api/auth/login',[
    check('email','this email is not valid').isEmail(),
     //the check function takes in the name of the name of the proprtyu we want to check and its erropr message
    //  and isEmail() confirms if its a valid email
    check('password','this password is not valid').exists()
    //exists() confirms if its the property exists
],userController.userLogin)

// get logged in user 
Router.get('/api/auth',auth,userController.loggedInUser)

// export router
module.exports=Router