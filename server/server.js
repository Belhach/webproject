const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const router = require('./router');

const app = express();

const server = http.createServer(app);
const io = socketio(server);
const port = process.env.port || 3000;

io.on('connection', (socket) => {
    console.log('user is connected');
    socket.on('disconnect', () =>{
        console.log('user is noew disconnected');
    });
});

app.use(router);
server.listen(port, () => console.log('server is running on port : ',port));