// express cors socket.io

/* Importing the express module. */
const express = require('express')

/* Creating an instance of express. */
const app = express()

/* Create an instance of http library, per doc this is the suggested way for socket */
const http = require('http')

const {Server} = require('socket.io') //class

const PORT = process.env.PORT || 3001
const cors = require('cors')
app.use(cors())

/* creating a server with express */
const server =  http.createServer(app) 
/*  */
const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000', //front end
        methods:['GET','POST']
    }
})

//listen to event
io.on("connection",(socket)=>{ //somebody just connected to the socket
    console.log(`User connected with id: ${socket.id}`)
    socket.on('send_message',(data)=>{ //from client
        io.sockets.emit('send_message_to_client_from_server',{message: data.message,id: socket.id}) //send to everyone connected except the sender
    })

})


server.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})