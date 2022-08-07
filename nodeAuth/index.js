/* 
    what are we doing here?
  1. create an express server
  2.  connecting to mongo DB
  3.  initiallize express
  4.  initiallize express middleware
  5.  create a simple get request route(optional)
  6.  inject our routes 
  7.  listen to our server
*/
  
  const express = require('express')
  const {connectDB}= require('./db/server')
  require('dotenv').config()//allows us to use the environmental variables in our env file

//   connect to db
connectDB();

// initailize express
const app =express();

// initialize express middleware
app.use(express.json({extended:false}))

// create a basic express route
app.get('/',(req,res)=>res.json({message:'welcome,ready to rapport'}))//takes in the url an dthen a call back function which takes the request and response

// Routes
app.use('/api/users/staffs', require('./routes/staffUsers'));//
app.use('/api/users/managers', require('./routes/managerUsers'));//
app.use('/api/users/admin', require('./routes/admin'));//
app.use('/api/staffAuth', require('./routes/staffAuthRoute'));//
app.use('/api/managerAuth', require('./routes/managerAuthRoute'));//
app.use('/api/adminAuth', require('./routes/adminAuthRoute'));//

// PORT 
const Port = process.env.PORT || 4005
// lsiten to the connection
app.listen(Port,()=>console.log(`server running on Port ${Port}`))