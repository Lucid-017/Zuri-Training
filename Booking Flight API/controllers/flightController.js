// access our flightModel that contains our db data
const flightModel=require('../models/Flight')
const {writeDataToFile, getPostData}= require('../util')

// get all flights
async function getFlights(req,res){//function to get all flight data
    // in any case that we are still fething the data
    const flights =await flightModel.allFlights()
    try{
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify(flights))

    }catch(err){
        console.log(err)
    }
}

// get flight by id
async function getFlight(req,res,id){//function to get flight data by id
    // in any case that we are still fething the data
    const flights =await flightModel.flightById(id)
    
    // if flight id does not exist the throw an error
    try{
    if(!flights){
        res.writeHead(404,{"Content-Type":"application/json"})
        res.end(JSON.stringify({message:"flight not Found"}))
    }else{
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify(flights))
    }
        }catch(err){
        console.log(err)
    }
}

// post flight to database
async function postFlight(req,res){//function to post flights(Post request)
     try{
        // we want to create a body and assign it to our getpostData util function 
        const body=await getPostData(req)
        // deconstruct data we need from the body whih will represnt our flight data
        const {title,time,price,date}=JSON.parse(body)

        const flightDemo={
            title,
            time,
            price,
            date
        }
        // then create a new flight variable that takes in our flight json data
        // then uses our model function to then parses our flightdemo and inserts it our database
        const newFlight= await flightModel.createFlight(flightDemo)
        console.log('demo',newFlight)
        // 201 are used for post requests
        res.writeHead(201,{"Content-Type":"application/json"})
       return res.end(JSON.stringify(newFlight))

    
        }catch(err){
        console.log(err)
    }
}
// update flight to database
// @route PUT /flights/:id flight to database
async function updateFlight (req,res,id ){
     try{
        // we need to first find flight by id
        const flights =await flightModel.flightById(id)
        // then if flight id dosen't exist
        if(!flights){
            res.writeHead(404,{"Content-Type":"application/json"})
            res.end(JSON.stringify({message:"flight not Found"}))    
        }else{
            // else we await postData from our utils function,destruct then and get the files we need to interact with
            const body=await getPostData(req)
            const {title,time,price,date}= JSON.parse(body)
            // now we might want to update only one key value,
            // we need to make sure that the values we dont update remains the same as it initially was 
            const flightDemoData={
                title:title ||flights.title,
                time: time ||flights.time,
                price:price || flights.price,
                date:date || flights.date
            }
            // now we will await our update function from our model
            const updatedFlight= await flightModel.update(id,flightDemoData)
             console.log('controller updated fligth',updateFlight)
            // 200 are used for update requests
            res.writeHead(200,{"Content-Type":"application/json"})
        return res.end(JSON.stringify(updatedFlight))

        }
        }catch(err){
        console.log(err)
    }
}
// // Delete flight from database
// @route DELETE /flights/:id flight 
async function deleteFlight(req,res,id){
    // in any case that we are still fething the data
    const flights =await flightModel.flightById(id)
    
    // if flight id does not exist the throw an error
    try{
    if(!flights){
        res.writeHead(404,{"Content-Type":"application/json"})
        res.end(JSON.stringify({message:"flight not Found"}))
    }else{
        await flightModel.remove(id)
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify({message:`flight ${id} has been deleted`}))
    }
        }catch(err){
        console.log(err)
    }
}

module.exports={
    getFlights,
    getFlight,
    postFlight,
    updateFlight,
    deleteFlight
}
