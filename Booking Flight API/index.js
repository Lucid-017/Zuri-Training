// build a rest API with just http server
const http = require('http')
// get flight data from controller
const {getFlights,getFlight,postFlight,updateFlight,deleteFlight}=require('./controllers/flightController')

const app =http.createServer((req,res)=>{
    // Routes
    if(req.url==='/flights'&& req.method ==='GET'){
        getFlights(req,res)
    }
    // Get flight by id
    else if(req.url.match(/\/flights\/([0-9]+)/) && req.method==='GET'){
        console.log(req.url.match(/\/flights\/([0-9]+)/))
        const id = req.url.split('/')[2]
        console.log('id=',id)
        getFlight(req,res,id)
    }
    // Book/Add a flight
    else if(req.url === '/flights' && req.method === 'POST'){
        postFlight(req,res)
    }
    // update a flight by id
    else if(req.url.match(/\/flights\/([0-9]+)/) && req.method==='PUT'){
        const id = req.url.split('/')[2]
        updateFlight(req,res,id)
    }
    // Delete a flight
    else if(req.url.match(/\/flights\/([0-9]+)/) && req.method==='DELETE'){
        const id = req.url.split('/')[2]
        deleteFlight(req,res,id)
    }
    // Error handling
    else{
        res.writeHead(404,{"Content-Type":"application/json"})
        res.end(JSON.stringify({message:"route not found"}))
    }
    
})
const PORT = process.env.PORT||6000
// listen 

app.listen(PORT,()=>console.log(`server running on port ${PORT }`))
