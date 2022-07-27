//NOTE creating a http server
// first - create a variable (http module)
const http = require('http');
const fs = require('fs')
// const url =require('url')
// http is a module(file exported for use) that comes with node js

// create a server with the http variable
http.createServer((req,res)=>{//create server takes in a callback function ,the request and the reponse
    if(req.url ==='/home' || req.url ==='/'){
        fs.readFile('Portfolio/home.html',(err,data)=>{
            if(err) throw err;
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data)
            res.end()
          })
    }
    else if(req.url ==='/contact'){
        fs.readFile('Portfolio/contact.html',(err,data)=>{
            if(err) throw err;
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data)
            res.end()
          })
    }
    else if(req.url ==='/about'){
        fs.readFile('Portfolio/about.html',(err,data)=>{
            if(err) throw err;
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data)
            res.end()
          })
    }else{
        res.writeHead(404,{'Content-Type':'text/html'})
            res.end('not found')
    }
 
  
   
}).listen(4000)//takes in portnumber and ip address

console.log('server running....')

