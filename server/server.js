const express = require('express');
const http = require('http');
const socketio = require('socket.io');



const app = express();

const server = http.createServer(app);
const io = socketio(server);
const port = process.env.port || 5000;
const router = require('./router');

io.on('connection', (socket) => {
    console.log('user is connected');

    socket.on('join', ({ name, groupName},callback)=>{
        console.log(name, groupName);
    });
    
    socket.on('disconnect', () =>{
        console.log('user is now disconnected');
    });
});

app.use(router);
server.listen(port, () => console.log('server is running on port : ',port));