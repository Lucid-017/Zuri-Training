// models are basic representation of what your database is going to be
// and in modern programming we use something call schemas
// and what schemas do is that they define the shape of documents inside a particular collection
const mongoose = require('mongoose')

// create user schema
const userSchema = mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true //this means this property is a mandatory key value
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true //this means no email can be the same 
        },
        password:{
            type:String,
        },
        userRoles:{
            type:String,
            enum:["staff", "managers", "admin","notassigned"],//
            default:"notassigned"//userRoles will be not assigned by default
        },
        isAdmin:{
            type:Boolean,
            default:0 //0 represents false
        },
        isManager:{
            type:Boolean,
            default:0
        }
        //why are we represnting isAdmin or is Manager?,this is to able to use access control
        // a user can be a manager and an admin and vice versa,or can choose to be just the original
        // but staffs cannot become admins or managers in this app

    },
    {
        timestamps:true //this creates a time stamp for every action,when it was created or modified
    }

)
module.exports= mongoose.model('UserModel',userSchema) //takes in the name of the model and its schema 