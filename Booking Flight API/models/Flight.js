// here in the model we are going to handle all our data from the database
// use our local database
let flights=require('../data/Flights.json')
const {v4:uuidv4}=require('uuid')
const {writeDataToFile}=require('../util')


// create a function that returns a promise and resolves out data
function allFlights(){
    return new Promise((resolve,reject)=>{return resolve(flights)})
}

// get flight by id
function flightById(id){
    return new Promise((resolve,reject)=>{
        // we want to get find our post request by id
        const Pflight=flights.find((p)=>p.id===id)
        console.log(Pflight)
        resolve(Pflight)
    })
}
// create flight (post request)
function createFlight(newFlight){
    return new Promise((resolve,reject)=>{
        // create a new post format that takes in our new flight as an arg
        // 
        const newflight ={id:uuidv4(),...newFlight}
        flights.push(newflight)
        writeDataToFile('./data/Flights.json',flights)
        resolve(newFlight)
    })
}
// update flight (PUt request)
function update(id,updateFlight){
    return new Promise((resolve,reject)=>{
        // the file we are editing already exist we need a way to access its index
        const index = flights.findIndex((flightIndex)=>flightIndex.id ===id)
        flights[index] ={id, ...updateFlight}
        writeDataToFile('./data/Flights.json',flights)
        resolve(flights[index])
    })
}
// delete flight (DELETE request)
function remove(id){
    return new Promise((resolve,reject)=>{
        // we want to delete data by id from our flight database using filter
        // so we are filtering our flight database
        flights= flights.filter((flight)=>flight.id!==id)
        writeDataToFile('./data/Flights.json',flights)
        resolve()
    })
}

module.exports ={
    allFlights,
    flightById,
    createFlight,
    update,
    remove
}