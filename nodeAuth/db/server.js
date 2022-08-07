/* 
    what are we doing here?
  1. creating a connection function for mongoDb(using mongoose)
  2.  start a local mongoDB server cnnection
*/
const mongoose = require('mongoose')
require('dotenv').config()
const {MONGO_URI}= process.env

// create a connection function
const connectDB = async()=>{
    try {
        await mongoose.connect(MONGO_URI,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })//takes in our connection string and our mongoDb options
    console.log('mongoDb connected.....')    
    } catch (error) {
        console.error(error.message)
        // exit with faulure
        process.exit(1)
    }
}

module.exports={
    connectDB
}